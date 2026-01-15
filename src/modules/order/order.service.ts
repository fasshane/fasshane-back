import { HttpException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CustomerOrder } from "@prisma/client";
import { OrderUpdateDto } from "./dto/request/order-update.dto";
import { OrderCreateDto } from "./dto/request/order-create.dto";
import { MealRepository } from "../meal/meal.repository";

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository, private mealRepository: MealRepository) { }

  async getTransactions() {
    return this.orderRepository.getTransactionsForFpgrowth();
  }

  async runFpgrowthFromDb(
    minSupport?: number,
    minConfidence?: number,
  ) {
    const transactions = await this.getTransactions();
    if (transactions.length === 0) {
      throw new HttpException("No transactions available for analytics", 400);
    }

    return this.runFpgrowth(transactions, minSupport, minConfidence);
  }


  private readonly fpgrowthUrl = process.env.FPGROWTH_URL ?? "http://localhost:3021/fpgrowth";

  async runFpgrowth(
    transactions: string[][],
    minSupport?: number,
    minConfidence?: number,
  ) {
    const payload: {
      transactions: string[][];
      minSupport?: number;
      minConfidence?: number;
    } = { transactions };

    if (typeof minSupport === "number") {
      payload.minSupport = minSupport;
    }

    if (typeof minConfidence === "number") {
      payload.minConfidence = minConfidence;
    }

    const response = await fetch(this.fpgrowthUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const data = text ? this.parseFpgrowthResponse(text) : null;

    if (!response.ok) {
      const message =
        typeof data === "string"
          ? data
          : data?.error ?? "FPGrowth request failed";
      throw new HttpException(message, response.status);
    }

    return data;
  }

  private parseFpgrowthResponse(text: string) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  // async getCustomerOrder(customerId: string) {
  //   return await this.orderRepository.getCustomerOrder(customerId);
  // }

  async createOrder(customerId: string) {
    return await this.orderRepository.createOrder(customerId);
  }

  async createOrderByCashier(cashierId: string, dto: OrderCreateDto) {
    const orderItemsMap = new Map(dto.items.map(i => [i.id, i]));
    const meals = await this.mealRepository.getMealsByIds( Array.from(orderItemsMap.keys()));
    const totalPrice = meals.reduce((a, b) => a + b.price.toNumber() * orderItemsMap.get(b.id).quantity, 0);

    return await this.orderRepository.createOrderByCashier(cashierId, {...dto, totalPrice: totalPrice});
  }

  // async addItemToOrder(customerId: string, productId: string, quantity = 1) {
  //   return await this.orderRepository.addItemToOrder(customerId, productId, quantity);
  // }

  async getUserOrders(customerId: string): Promise<CustomerOrder[]> {
    return await this.orderRepository.getUserOrders(customerId);
  }

  async getCurrentOrder(customerId: string): Promise<CustomerOrder> {
    return await this.orderRepository.getInitialOrderByUserId(customerId);
  }


  async updateItemQuantity(customerId: string, productId: string, quantity: number, price: number) {
    let order = await this.orderRepository.getInitialOrderByUserId(customerId);
    if (order == null) {
      order = await this.orderRepository.createOrder(customerId);
    }
console.log('order id: ', order.id)
    return await this.orderRepository.updateItemQuantity(order.id, productId, quantity, price);

  }

  async updateOrder(dto: OrderUpdateDto) {
    return await this.orderRepository.updateOrder(dto);
  }

  async payOrder(order: OrderCreateDto) {
    return await this.orderRepository.payOrder(order);
  }

  // async removeItemFromOrder(customerId: string, productId: string) {
  //   return await this.orderRepository.removeItemFromOrder(customerId, productId);
  // }

  // async clearOrder(customerId: string) {
  //   return await this.orderRepository.clearOrder(customerId);
  // }
}