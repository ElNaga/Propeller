import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProductType } from "./product.type";
import { ProductService } from "./product.service";
import { CreateProductInput } from "./create-product.input";
import { UpdateProductInput } from "./update-product.input";

@Resolver(of => ProductType)
export class ProductResolver {
    constructor(
        private productService: ProductService
    ) {}
    // here define queries or mutations
    // @Query(returns => ProductType)
    // product() {
    //     return {
    //         id: 'asdasd',
    //         name: 'nameOfProduct',
    //         price: 34243,
    //         status: 'active',
    //     }
    // }
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
}