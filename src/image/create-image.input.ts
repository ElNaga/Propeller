import { InputType,Field} from "@nestjs/graphql";
import { MinLength, IsInt } from "class-validator";


@InputType()
export class CreateImageInput {

    @MinLength(1)
    @Field()
    url: string = 'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

    @IsInt()
    @Field()
    priority: number = 1000;

}