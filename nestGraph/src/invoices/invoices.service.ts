import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from 'src/sellers/entities/seller.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createInvoiceInput: CreateInvoiceInput): Promise<Invoice> {
    const { sellerId, customerId, ...validInput } = createInvoiceInput;

    const seller = await this.sellersRepository.findOne({
      where: { id: sellerId },
    });
    if (!seller) {
      throw new BadRequestException('Seller not found');
    }

    const customer = await this.customersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const newInvoice = this.invoicesRepository.create({
      ...validInput,
      seller,
      customer,
    });

    return await this.invoicesRepository.save(newInvoice);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      relations: {
        seller: true,
        customer: true,
      },
    });
  }

  async findOne(id: number): Promise<Invoice> {
    return await this.invoicesRepository.findOne({
      where: { id },
      relations: ['customer', 'seller'],
    });
  }

  async update(id: number, updateInvoiceInput: UpdateInvoiceInput) {
    const invoice = await this.invoicesRepository.findOne({
      where: { id },
      relations: ['seller', 'customer'],
    });

    if (invoice) {
      const { sellerId, customerId, date, total } = updateInvoiceInput;

      if (sellerId !== undefined) {
        const seller = await this.sellersRepository.findOne({
          where: { id: sellerId },
        });
        if (seller) invoice.seller = seller;
      }

      if (customerId !== undefined) {
        const customer = await this.customersRepository.findOne({
          where: { id: customerId },
        });
        if (customer) invoice.customer = customer;
      }

      if (date !== undefined) invoice.date = new Date(date);
      if (total !== undefined) invoice.total = total;

      return await this.invoicesRepository.save(invoice);
    }
  }

  async remove(id: number): Promise<void> {
    const invoiceToDelete = await this.invoicesRepository.findOne({
      where: { id },
    });
    if (!invoiceToDelete) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    await this.invoicesRepository.remove(invoiceToDelete);
  }
}
