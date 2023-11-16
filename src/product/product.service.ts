import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ID } from "@nestjs/graphql";
import { Repository } from 'typeorm';
import { v4 as uuid} from 'uuid'
import { CreateProductInput } from './create-product.input';
import { UpdateProductInput } from './update-product.input';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) {}

    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const {name, price, status} = createProductInput;
        const product = this.productRepository.create({
            id: uuid(),
            name,
            price,
            status,
        });

        return this.productRepository.save(product);
    }

    async updateProduct(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
        const product = await this.productRepository.findOne({ where: {id} });
        if (!product) {
            throw new Error('Product not found');
        }

        Object.assign(product, updateProductInput);

        return this.productRepository.save(product);
    }

    async deleteProduct(id: string): Promise<boolean> {
        const result = await this.productRepository.delete({id: id});
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return true;
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async getOneProduct(id: string): Promise<Product> {
        return this.productRepository.findOne({where: {id}});
    }
}
