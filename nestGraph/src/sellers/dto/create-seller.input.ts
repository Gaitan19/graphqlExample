import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  lastName: string;
}
