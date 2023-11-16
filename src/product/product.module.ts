import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ImageModule } from 'src/image/image.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ImageModule
    ],
    providers: [ProductResolver, ProductService]
})
export class ProductModule {}
