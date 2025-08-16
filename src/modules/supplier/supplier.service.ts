import { BadRequestException, Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { SupplierCreateRequestDto, SupplierUpdateRequestDto } from './dto';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class SupplierService {
  constructor(
    readonly repository: SupplierRepository,
    readonly productRepo: ProductRepository,
  ) {}

  async getAll() {
    const suppliers = await this.repository.findAll();
    return suppliers.map((supplier) => ({
      ...supplier,
      products: supplier._count.products,
      orders: supplier._count.orders,
    }));
  }

  async create(dto: SupplierCreateRequestDto) {
    return this.repository.createOne(dto);
  }

  async getOne(id: string) {
    const supplier = await this.repository.findOneWithProducts(id);
    if (!supplier) {
      throw new BadRequestException('Постачальника не знайдено');
    }
    return supplier;
  }

  async updateOne(id: string, dto: SupplierUpdateRequestDto) {
    await this.getOne(id);
    return this.repository.updateWithProducts(id, dto);
  }

  async deleteOne(id: string) {
    await this.getOne(id);
    return this.repository.deleteOne(id);
  }

  async changeStatus(id: string) {
    const supplier = await this.getOne(id);
    return this.repository.changeStatus(id, !supplier.active);
  }
}
