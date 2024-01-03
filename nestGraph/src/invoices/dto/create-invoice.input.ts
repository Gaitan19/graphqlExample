import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {
  @Field(() => Int)
  customerId: number;

  @Field(() => Int)
  sellerId: number;

  @Field()
  date: Date;

  @Field(() => Float)
  total: number;
}
