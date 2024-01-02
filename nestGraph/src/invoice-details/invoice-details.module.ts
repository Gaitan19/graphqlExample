import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsResolver } from './invoice-details.resolver';

@Module({
  providers: [InvoiceDetailsResolver, InvoiceDetailsService],
})
export class InvoiceDetailsModule {}
