import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateImageInput } from './create-image.input';

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
}
