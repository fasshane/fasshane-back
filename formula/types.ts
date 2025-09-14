import { ProductType } from '@prisma/client';

export type Product = {
  id: string;
  name: string;
  type: ProductType;
};

export type Supplier = {
  id: string;
  name: string;
  deliveryCost: number;
  rate: number;
  products: SupplierProduct[];
};

export type SupplierProduct = {
  id: string;
  product: Product;
  // supplierId: string;
  price: number;
  maxCount: number;
  rate: number;
};

export type NeedProduct = {
  id: string;
  product: Product;
  quantity: number;
};

export type Need = {
  id: string;
  products: NeedProduct[];
};

export type OrderProduct = {
  id: string;
  product: SupplierProduct;
  quantity: number;
};

export type Order = {
  id: string;
  products: OrderProduct[];
  totalPrice: number;
};
