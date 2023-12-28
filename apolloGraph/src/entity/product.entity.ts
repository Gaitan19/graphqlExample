import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../utils/columnNumericTransformer';
import { InvoiceDetail } from './invoiceDetail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unitofmeasure: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.product)
  invoiceDetails: InvoiceDetail[];


}
