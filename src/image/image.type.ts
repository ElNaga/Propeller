import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType('Image')
export class ImageType {

    @Field(type => ID)
    id: string;

    @Field()
    url: string;

    @Field()
    priority: number;

}