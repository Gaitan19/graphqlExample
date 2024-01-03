import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceDetailInput {
  @Field(() => Int)
  invoiceId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
