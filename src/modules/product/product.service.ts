import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(readonly repository: ProductRepository) {
  }

  findAllShort() {
    return this.repository.findAllShort();
  }

  findAll() {
    return this.repository.findAll();
  }

  deleteOne(id: string) {
    return this.repository.deleteOne(id);
  }

  createOne(product: Prisma.ProductCreateInput) {
    return this.repository.createOne(product);
  }

  updateOne(id: string, product: Prisma.ProductUpdateInput) {
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