import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageResolver } from './image.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image])
  ],
  providers: [ImageResolver, ImageService]
})
export class ImageModule {}
