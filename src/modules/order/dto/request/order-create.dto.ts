export type OrderCreateDto = {
  customerId?: string | null;
  items: OrderItemDto[];
  totalPrice: number;
};

export type OrderItemDto = {
  id: string,
  quantity: number,
  price: number,
  meal: MealDto,
}

export type MealDto = {
    id: string,
    name: string,
    description: string,
    image: string,
}