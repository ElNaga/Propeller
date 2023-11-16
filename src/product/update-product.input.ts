import { InputType,Field } from "@nestjs/graphql";
import { Status } from "./status.enum";
import { IsEnum, MinLength, IsNumber } from "class-validator";
import { ImageType } from "../image/image.type";


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

    @Field(type => [ImageType], { nullable: true })
    images?: ImageType[];

}