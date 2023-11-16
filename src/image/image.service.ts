import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository, In } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateImageInput } from './create-image.input';
import { UpdateImageInput } from './update-image.input';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async createImage(createImageInput: CreateImageInput): Promise<Image> {
    const { url, priority } = createImageInput;
    const image = this.imageRepository.create({
      id: uuid(),
      url,
      priority,
    });
    return this.imageRepository.save(image);
  }

  async updateImageById(id: string, updateImageInput: UpdateImageInput): Promise<Image> {
    const product = await this.imageRepository.findOne({ where: {id} });
    if (!product) {
        throw new Error('Product not found');
    }

    Object.assign(product, updateImageInput);

    return this.imageRepository.save(product);
}

  async deleteImage(id: string): Promise<boolean> {
    const result = await this.imageRepository.delete({id: id});
    if (result.affected === 0) {
        throw new NotFoundException(`Image with ID "${id}" not found`);
    }
    return true;
}

  async getAllImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async getOneImage(id: string): Promise<Image> {
    return this.imageRepository.findOne({ where: { id } });
  }

  async getManyImages(imagesIds: string[]): Promise<Image[]> {
    return await this.imageRepository.find({
      where: {
        id: {
          $in: imagesIds 
        } as any,
      },
    });
  }
}
