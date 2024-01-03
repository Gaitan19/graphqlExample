import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvoiceDetailInput } from './dto/create-invoice-detail.input';
import { UpdateInvoiceDetailInput } from './dto/update-invoice-detail.input';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailsRepository: Repository<InvoiceDetail>,

    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createInvoiceDetailInput: CreateInvoiceDetailInput) {
    const { invoiceId, productId, ...validInput } = createInvoiceDetailInput;

    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const invoice = await this.invoicesRepository.findOne({
      where: { id: invoiceId },
      relations: ['seller', 'customer'],
    });

    if (!product) {
      throw new BadRequestException('Invoice not found');
    }

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const newInvoiceDetail = await this.invoiceDetailsRepository.create({
      ...validInput,
      product,
      invoice,
    });

    return await this.invoiceDetailsRepository.save(newInvoiceDetail);
  }

  async findAll() {
    const invoiceDetails = await this.invoiceDetailsRepository.find({
      relations: ['product', 'invoice', 'invoice.seller', 'invoice.customer'],
    });

    return invoiceDetails;
  }

  async findOne(id: number) {
    const invoiceDetail = await this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: ['product', 'invoice', 'invoice.seller', 'invoice.customer'],
    });

    if (!invoiceDetail) {
      throw new BadRequestException('InvoiceDetail not found');
    }
    return invoiceDetail;
  }

  async update(id: number, updateInvoiceDetailInput: UpdateInvoiceDetailInput) {
    const invoiceDetail = await this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: ['product', 'invoice', 'invoice.seller', 'invoice.customer'],
    });

    if (!invoiceDetail) {
      throw new BadRequestException('InvoiceDetail not found');
    }

    const { quantity, price, productId, invoiceId } = updateInvoiceDetailInput;

    if (quantity !== undefined) invoiceDetail.quantity = quantity;
    if (price !== undefined) invoiceDetail.price = price;
    if (productId !== undefined) {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
      });
      if (product) invoiceDetail.product = product;
    }
    if (invoiceId !== undefined) {
      const invoice = await this.invoicesRepository.findOne({
        where: { id: invoiceId },
      });
      if (invoice) invoiceDetail.invoice = invoice;
    }

    return await this.invoiceDetailsRepository.save(invoiceDetail);
  }

  async remove(id: number): Promise<void> {
    const invoiceDetailToDelete = await this.invoiceDetailsRepository.findOne({
      where: { id },
    });
    if (!invoiceDetailToDelete) {
      throw new NotFoundException(`InvoiceDetail with ID ${id} not found`);
    }

    await this.invoiceDetailsRepository.remove(invoiceDetailToDelete);
  }
}
