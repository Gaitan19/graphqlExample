import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../utils/columnNumericTransformer';
import { Product } from './product.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ManyToOne(() => Product, (product) => product.invoiceDetails)
  product: Product;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice: Invoice;
}
