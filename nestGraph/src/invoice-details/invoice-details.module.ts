import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsResolver } from './invoice-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail])],

  providers: [InvoiceDetailsResolver, InvoiceDetailsService],
  exports: [TypeOrmModule],
})
export class InvoiceDetailsModule {}
