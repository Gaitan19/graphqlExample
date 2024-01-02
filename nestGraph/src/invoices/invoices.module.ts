import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { Invoice } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],

  providers: [InvoicesResolver, InvoicesService],

  exports: [TypeOrmModule],
})
export class InvoicesModule {}
