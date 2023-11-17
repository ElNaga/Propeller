import { InputType, Field, ID} from "@nestjs/graphql";
import { IsUUID} from "class-validator";


@InputType()
export class AssignImagesToProductInput {
    
    @IsUUID()
    @Field(type => ID)
    productId: string;

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    imagesIds: string[]

}