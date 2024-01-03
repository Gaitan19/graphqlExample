import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersModule } from 'src/sellers/sellers.module';
import { SellersService } from 'src/sellers/sellers.service';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    SellersModule,
    CustomersModule,
  ],

  providers: [
    InvoicesResolver,
    InvoicesService,
    SellersService,
    CustomersService,
  ],

  exports: [TypeOrmModule],
})
export class InvoicesModule {}
