import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const newCustomer = this.customersRepository.create(createCustomerInput);
    return await this.customersRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customersRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    await this.customersRepository.update(id, updateCustomerInput);
    return await this.customersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const customerToDelete = await this.customersRepository.findOne({
      where: { id },
    });
    if (!customerToDelete) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    await this.customersRepository.remove(customerToDelete);
  }
}
