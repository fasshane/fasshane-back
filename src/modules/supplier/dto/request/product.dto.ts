import { Product } from '@prisma/client';

export type SupplierProductDto = {
  id: string;
  price: number;
  quantity: number;
  product: Product;
}