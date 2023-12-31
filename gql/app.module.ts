import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { ImageModule } from './image/image.module';
import { Image } from './image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/propeller',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Product,
        Image
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ProductModule,
    ImageModule,
  ],
  // providers: [ProductService],
})
export class AppModule {}
