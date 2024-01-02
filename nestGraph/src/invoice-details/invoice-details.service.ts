import { Injectable } from '@nestjs/common';
import { CreateInvoiceDetailInput } from './dto/create-invoice-detail.input';
import { UpdateInvoiceDetailInput } from './dto/update-invoice-detail.input';

@Injectable()
export class InvoiceDetailsService {
  create(createInvoiceDetailInput: CreateInvoiceDetailInput) {
    return 'This action adds a new invoiceDetail';
  }

  findAll() {
    return `This action returns all invoiceDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceDetail`;
  }

  update(id: number, updateInvoiceDetailInput: UpdateInvoiceDetailInput) {
    return `This action updates a #${id} invoiceDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceDetail`;
  }
}
