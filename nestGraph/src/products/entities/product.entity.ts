import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { InvoiceDetail } from 'src/invoice-details/entities/invoice-detail.entity';
import { DecimalColumnTransformer } from 'src/utils/columnNumericTransformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  description: string;

  @Field(() => String)
  @Column({ default: '', nullable: true })
  unitofmeasure: string;

  @Field(() => Float)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @Field(() => Int)
  @Column()
  stock: number;

  @OneToMany(() => InvoiceDetail, (invoiceDetail) => invoiceDetail.product)
  invoiceDetails: InvoiceDetail[];
}
