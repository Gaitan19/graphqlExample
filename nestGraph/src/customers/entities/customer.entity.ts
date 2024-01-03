import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => Int)
  @Column()
  phone: number;

  @Field(() => Invoice)
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];
}
