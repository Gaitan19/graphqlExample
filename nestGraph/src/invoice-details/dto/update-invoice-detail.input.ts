import { CreateInvoiceDetailInput } from './create-invoice-detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceDetailInput extends PartialType(CreateInvoiceDetailInput) {
  @Field(() => Int)
  id: number;
}
