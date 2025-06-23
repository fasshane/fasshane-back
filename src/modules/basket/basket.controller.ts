import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  async getBasket(@Req() req) {
    const customerId = "cbefcccc-2366-407f-a5f7-296b93f87845"; //req.user.customerId;
    return this.basketService.getCustomerBasket(customerId);
  }

  @Post('add')
  async addItem(@Req() req, @Body() body: { productId: string; quantity?: number }) {
    const customerId = req.user.customerId;
    return this.basketService.addItemToBasket(customerId, body.productId, body.quantity);
  }

  @Patch('update')
  async updateItem(@Req() req, @Body() body: { productId: string; quantity: number }) {
    const customerId = req.user.customerId;
    return this.basketService.updateItemQuantity(customerId, body.productId, body.quantity);
  }

  @Delete('remove')
  async removeItem(@Req() req, @Body() body: { productId: string }) {
    const customerId = req.user.customerId;
    return this.basketService.removeItemFromBasket(customerId, body.productId);
  }

  @Delete('clear')
  async clear(@Req() req) {
    const customerId = req.user.customerId;
    return this.basketService.clearBasket(customerId);
  }
}