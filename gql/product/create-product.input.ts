import { InputType, Field, ID } from "@nestjs/graphql";
import { Status } from "./status.enum";
import { IsEnum, MinLength, IsNumber, IsUUID } from "class-validator";

@InputType()
export class CreateProductInput {

  @MinLength(1)
  @Field()
  name: string;

  @IsNumber()
  @Field()
  price: number;

  @IsEnum(Status)
  @Field(type => Status)
  status: Status;

  @IsUUID("4", { each: true })
  @Field(() => [ID], { defaultValue: [] })
  images: string[]; // Default to empty array
}