import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Status } from "./status.enum";
import { ImageType } from "../image/image.type";


@ObjectType('Product')
export class ProductType {

    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field(type => Status)
    status: Status;

    @Field(type => [ImageType])
    images: string[];
}