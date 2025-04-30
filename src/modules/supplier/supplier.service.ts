import { BadRequestException, Injectable } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { SupplierCreateRequestDto, SupplierUpdateRequestDto } from './dto';
import { ProductRepository } from '../product/product.repository';


@Injectable()
export class SupplierService {
  constructor(
    readonly repository: SupplierRepository,
    readonly productRepo: ProductRepository,
  ) {
  }

  async getAll() {
    const suppliers = await this.repository.findAll();
    return suppliers.map(supplier => ({
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
      throw new BadRequestException('Supplier not found');
    }
    return supplier;
  }

  async updateOne(id: string, dto: SupplierUpdateRequestDto) {
    const supplier = await this.getOne(id);
    if (!supplier) {
      throw new BadRequestException('Supplier not found');
    }

    return this.repository.updateWithProducts(id, dto);
  }

  async deleteOne(id: string) {
    const supplier = await this.repository.findOne(id);
    if (!supplier) {
      throw new BadRequestException('Supplier not found');
    }
    return this.repository.deleteOne(id);
  }

  private convertProductFields(products: Array<any>) {
    return products.map(product => ({
      ...product,
      price: Number(product.price),  // Перетворюємо price в number
      quantity: Number(product.quantity),  // Перетворюємо quantity в number
    }));
  }
}