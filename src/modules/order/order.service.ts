import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CustomerOrder } from "@prisma/client";
import { OrderUpdateDto } from "./dto/request/order-update.dto";
import { OrderCreateDto } from "./dto/request/order-create.dto";

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) { }

  // async getCustomerOrder(customerId: string) {
  //   return await this.orderRepository.getCustomerOrder(customerId);
  // }

  async createOrder(customerId: string) {
    return await this.orderRepository.createOrder(customerId);
  }

  async createOrderByCashier(customerId: string, dto: OrderCreateDto) {
    return await this.orderRepository.createOrderByCashier(customerId, dto);
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

  async payOrder(orderId: string) {
    return await this.orderRepository.payOrder(orderId);
  }

  // async removeItemFromOrder(customerId: string, productId: string) {
  //   return await this.orderRepository.removeItemFromOrder(customerId, productId);
  // }

  // async clearOrder(customerId: string) {
  //   return await this.orderRepository.clearOrder(customerId);
  // }
}