import { InputType,Field} from "@nestjs/graphql";
import { MinLength, IsInt } from "class-validator";


@InputType()
export class UpdateImageInput {

    @MinLength(1)
    @Field()
    url: string;

    @IsInt()
    @Field()
    priority: number;

}