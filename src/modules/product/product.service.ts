import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Express } from 'express';
import { S3Service } from '../../s3/s3.service';
import {
  ProductCreateRequestDto,
  ProductUpdateRequestDto,
} from './dto/request';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    readonly repository: ProductRepository,
    readonly s3: S3Service,
  ) {}

  findAllShort() {
    return this.repository.findAllShort();
  }

  findAll() {
    return this.repository.findAll();
  }

  deleteOne(id: string) {
    return this.repository.deleteOne(id);
  }

  async createOne(body: ProductCreateRequestDto, file: Express.Multer.File) {
    if (!body.useDefaultImage && file) {
      const key = `${Date.now()}-${file.originalname}`;
      body.image = await this.s3.uploadFile(file, key);
    }
    delete body.useDefaultImage;
    return this.repository.createOne(body);
  }

  async updateOne(
    id: string,
    product: ProductUpdateRequestDto,
    file?: Express.Multer.File,
  ) {
    const productExists = await this.getOne(id);
    let newImageUrl: string | null = productExists.image;
    let shouldDeleteOldImage = false;

    if (!product.useDefaultImage && file) {
      const key = `${Date.now()}-${file.originalname}`;
      newImageUrl = await this.s3.uploadFile(file, key);
      shouldDeleteOldImage = true;
    }

    if (product.useDefaultImage && productExists.image) {
      newImageUrl = null;
      shouldDeleteOldImage = true;
    }

    if (shouldDeleteOldImage && productExists.image) {
      const url = productExists.image;
      const key = url.startsWith('http')
        ? url.split('/').slice(3).join('/')
        : url;
      await this.s3.deleteFile(key);
      this.logger.log('Product image deleted for id: ' + id);
    }

    product.image = newImageUrl;

    delete product.useDefaultImage;

    return this.repository.updateOne(id, product);
  }

  getOne(id: string) {
    const product = this.repository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
