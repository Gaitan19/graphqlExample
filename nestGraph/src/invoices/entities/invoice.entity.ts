import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { InvoiceDetail } from 'src/invoice-details/entities/invoice-detail.entity';
import { Seller } from 'src/sellers/entities/seller.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Invoice {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  exampleField: number;

  @Field()
  @Column()
  date: Date;

  @Field(() => Float)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new DecimalColumnTransformer(),
  })
  total: number;

  @ManyToOne(() => Seller, (seller) => seller.invoice)
  seller: Seller;

  @ManyToOne(() => Customer, (customer) => customer.invoice)
  customer: Customer;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.invoice)
  invoiceDetails: InvoiceDetail[];
}
