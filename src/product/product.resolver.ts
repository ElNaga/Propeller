import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { ProductType } from "./product.type";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductInput } from "./create-product.input";
import { UpdateProductInput } from "./update-product.input";
import { AssignImagesToProductInput } from "./assign-images-to-product.input";
import { ImageService } from "../image/image.service";

@Resolver(of => ProductType)
export class ProductResolver {
    constructor(
        private productService: ProductService,
        private imageService: ImageService
    ) {}

    @Query(returns => [ProductType])
    products() {
        return this.productService.getAllProducts();
    }

    @Query(returns => ProductType)
    product(@Args('id') id: string ) {
        return this.productService.getOneProduct(id);
    }

    @Mutation(returns => ProductType)
    createProduct(
        @Args('input') input: CreateProductInput,
    ) {
        return this.productService.createProduct(input);
    }

    @Mutation(returns => ProductType) 
    assignImagesToProduct(
        @Args('assignImagesToProduct') assignImagesToProduct: AssignImagesToProductInput
        ) {
            const {productId, imagesIds} = assignImagesToProduct;
            return this.productService.assignImageToProduct(productId, imagesIds)
        }
    

    @Mutation(returns => ProductType)
    updateProduct(
        @Args('id') id: string, 
        @Args('input') input: UpdateProductInput,
    ) {
        return this.productService.updateProduct(id, input);
    }

    @Mutation(returns => Boolean)
    async deleteProduct(@Args('id') id: string): Promise<boolean> {
        return this.productService.deleteProduct(id);
    }

    @ResolveField()
    async images(@Parent() product: Product) {
        return this.imageService.getManyImages(product.images)
    }
}