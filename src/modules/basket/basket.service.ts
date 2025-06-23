import { Injectable } from "@nestjs/common";
import { BasketRepository } from "./basket.repository";

@Injectable()
export class BasketService {
  constructor(private basketRepository: BasketRepository) {}

  async getCustomerBasket(customerId: string) {
    return await this.basketRepository.getCustomerBasket(customerId);
  }

  async addItemToBasket(customerId: string, productId: string, quantity = 1) {
    return await this.basketRepository.addItemToBasket(customerId, productId, quantity);
  }

  async updateItemQuantity(customerId: string, productId: string, quantity: number) {
    return await this.basketRepository.updateItemQuantity(customerId, productId, quantity);
  }

  async removeItemFromBasket(customerId: string, productId: string) {
    return await this.basketRepository.removeItemFromBasket(customerId, productId);
  }

  async clearBasket(customerId: string) {
    return await this.basketRepository.clearBasket(customerId);
  }
}