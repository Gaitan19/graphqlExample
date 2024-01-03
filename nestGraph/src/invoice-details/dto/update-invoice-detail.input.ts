import { CreateInvoiceDetailInput } from './create-invoice-detail.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceDetailInput extends PartialType(
  CreateInvoiceDetailInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  invoiceId?: number;

  @Field(() => Int, { nullable: true })
  productId?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  price?: number;
}
