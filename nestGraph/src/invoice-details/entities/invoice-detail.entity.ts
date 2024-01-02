import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Product } from 'src/products/entities/product.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class InvoiceDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  exampleField: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @ManyToOne(() => Product, (product) => product.invoiceDetails)
  product: Product;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice: Invoice;
}
