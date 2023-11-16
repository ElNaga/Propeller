import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ImageType } from "./image.type";
import { ImageService } from "./image.service";
import { CreateImageInput } from "./create-image.input";
// import { UpdateImageInput } from "./update-image.input";

@Resolver(of => ImageType) 
export class ImageResolver {
    constructor(
        private imageService: ImageService
    ) {}

    @Mutation(returns => ImageType)
    createImage(
        @Args('input') input: CreateImageInput,

    ) {
        return this.imageService.createImage(input);
    }
}