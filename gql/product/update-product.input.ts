import { InputType,Field, ID } from "@nestjs/graphql";
import { Status } from "./status.enum";
import { IsEnum, MinLength, IsNumber } from "class-validator";


@InputType()
export class UpdateProductInput {

    @MinLength(1)
    @Field()
    name: string;

    @IsNumber()
    @Field()
    price: number;

    @IsEnum(Status)
    @Field(type => Status)
    status: Status;

    @Field(() => [ID], { nullable: true }) // Optional
    images?: string[];

}