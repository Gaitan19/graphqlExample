import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  unitofmeasure: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}
