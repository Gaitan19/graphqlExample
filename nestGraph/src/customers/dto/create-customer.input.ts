import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  address: string;

  @Field(() => Int)
  phone: number;
}
