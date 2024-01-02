import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { CreateInvoiceDetailInput } from './dto/create-invoice-detail.input';
import { UpdateInvoiceDetailInput } from './dto/update-invoice-detail.input';

@Resolver(() => InvoiceDetail)
export class InvoiceDetailsResolver {
  constructor(private readonly invoiceDetailsService: InvoiceDetailsService) {}

  @Mutation(() => InvoiceDetail)
  createInvoiceDetail(@Args('createInvoiceDetailInput') createInvoiceDetailInput: CreateInvoiceDetailInput) {
    return this.invoiceDetailsService.create(createInvoiceDetailInput);
  }

  @Query(() => [InvoiceDetail], { name: 'invoiceDetails' })
  findAll() {
    return this.invoiceDetailsService.findAll();
  }

  @Query(() => InvoiceDetail, { name: 'invoiceDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceDetailsService.findOne(id);
  }

  @Mutation(() => InvoiceDetail)
  updateInvoiceDetail(@Args('updateInvoiceDetailInput') updateInvoiceDetailInput: UpdateInvoiceDetailInput) {
    return this.invoiceDetailsService.update(updateInvoiceDetailInput.id, updateInvoiceDetailInput);
  }

  @Mutation(() => InvoiceDetail)
  removeInvoiceDetail(@Args('id', { type: () => Int }) id: number) {
    return this.invoiceDetailsService.remove(id);
  }
}
