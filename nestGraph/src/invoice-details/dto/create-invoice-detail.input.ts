import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceDetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
