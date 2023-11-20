import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any, DeleteResult, Repository } from 'typeorm';
import { Image } from './image.entity';

describe('ImageService', () => {
  let service: ImageService;
  let mockRepository: Partial<Repository<Image>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(Image),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  describe('createImage', () => {
    it('should create and return an image', async () => {
      const createImageInput = {
        url: 'http://example.com/image.jpg',
        priority: 1,
      };
      const expectedImage = new Image();
      jest.spyOn(mockRepository, 'create').mockReturnValue(expectedImage);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedImage);

      const result = await service.createImage(createImageInput);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(createImageInput),
      );
      expect(mockRepository.save).toHaveBeenCalledWith(expectedImage);
      expect(result).toEqual(expectedImage);
    });
  });

  describe('updateImageById', () => {
    it('should update and return an image', async () => {
      const id = 'd320aa15-c2e7-4deb-a2cc-8c043ceb8b43';
      const updateImageInput = {
        url: 'http://example.com/new-image.jpg',
        priority: 10000,
      };
      const existingImage = new Image();
      existingImage.id = id;
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(existingImage);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(existingImage);

      const result = await service.updateImageById(id, updateImageInput);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateImageInput),
      );
      expect(result).toEqual(existingImage);
    });

    it('should throw an error if the image does not exist', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateImageById('non-existent-id', {
          url: 'http://example.com/new-image.jpg',
          priority: 10000,
        }),
      ).rejects.toThrow('Product not found');
    });
  });

});


