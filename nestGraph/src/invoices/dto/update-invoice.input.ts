import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  customerId?: number;

  @Field(() => Int, { nullable: true })
  sellerId?: number;

  @Field({ nullable: true })
  date?: Date;

  @Field(() => Float, { nullable: true })
  total?: number;
}
