import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  exampleField: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  address: string;

  @Field(() => Int)
  @Column()
  phone: number;

  @Field(() => Invoice)
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];
}
