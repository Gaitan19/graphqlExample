import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsResolver } from './invoice-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsService } from 'src/products/products.service';
import { CustomersService } from 'src/customers/customers.service';
import { SellersService } from 'src/sellers/sellers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceDetail]),
    InvoicesModule,
    SellersModule,
    CustomersModule,
    ProductsModule,
  ],

  providers: [
    InvoiceDetailsResolver,
    InvoiceDetailsService,
    SellersService,
    CustomersService,
    ProductsService,
  ],
  exports: [TypeOrmModule],
})
export class InvoiceDetailsModule {}
