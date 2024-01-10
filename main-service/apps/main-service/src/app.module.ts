import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SellersModule } from './sellers/sellers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';
import { EmailLogsModule } from './email-logs/email-logs.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { RolsModule } from './rols/rols.module';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'MAIL_SERVICE', transport: Transport.TCP },
    ]),
    ProductsModule,
    CustomersModule,
    SellersModule,
    InvoicesModule,
    InvoiceDetailsModule,
    EmailLogsModule,
    UsersModule,
    RolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
