import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Seller {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  exampleField: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @OneToMany(() => Invoice, (invoice) => invoice.seller)
  invoice: Invoice[];
}
