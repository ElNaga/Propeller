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

    @Query(returns => [ImageType])
    images() {
        return this.imageService.getAllImages();
    }

    @Query(returns => ImageType)
    image(@Args('id') id: string ) {
        return this.imageService.getOneImage(id);
    }

    @Mutation(returns => ImageType)
    createImage(
        @Args('input') input: CreateImageInput,

    ) {
        return this.imageService.createImage(input);
    }

    @Mutation(returns => Boolean)
    async deleteImage(@Args('id') id: string): Promise<boolean> {
        return this.imageService.deleteImage(id);
    }
}