import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OrderUpdateDto } from './dto/request/order-update.dto';
import { OrderCreateDto } from './dto/request/order-create.dto';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(@Req() req) {
    const customerId = req.user.id;
    // TODO: handle error when customerId is null or smth
    return this.orderService.createOrder(customerId);
  }

  @Post('createOrderByCashier')
  async createOrderByCashier(@Req() req, @Body() dto: OrderCreateDto) {
    const cashierId = req.user.id;
    // TODO: handle error when customerId is null or smth
    return this.orderService.createOrderByCashier(cashierId, dto);
  }

  @Get()
  async getUserOrders(@Req() req) {
    const customerId = req.user.id;
    // TODO: handle error when customerId is null or smth
    return this.orderService.getUserOrders(customerId);
  }

  @Get('getCurrentOrder')
  async getCurrentOrder(@Req() req) {
    const customerId = req.user.id;
    // TODO: handle error when customerId is null or smth
    return this.orderService.getCurrentOrder(customerId);
  }

  @Patch('addToOrder')
  async updateItem(@Req() req, @Body() body: { mealId: string; quantity: number, price: number }) {
    const customerId = req.user.id;
    console.log("customerId controller: ", customerId);
    return this.orderService.updateItemQuantity(customerId, body.mealId, body.quantity, body.price);
  }

  @Patch('update')
  async updateOrder(@Body() dto: OrderUpdateDto) {
    return this.orderService.updateOrder(dto);
  }

  @Post('payOrder')
  async payOrder(@Req() req, @Body() dto: OrderCreateDto) {
    const customerId = req.user.id;
    return this.orderService.payOrder({...dto, customerId});
  }

  // @Get()
  // async getOrderByCustomerId(@Req() req) {
  //   const customerId = req.user.customerId;
  //   return this.orderService.getCustomerOrder(customerId);
  // }

  // @Post('add')
  // async addItem(@Req() req, @Body() body: { productId: string; quantity?: number }) {
  //   const customerId = req.user.customerId;
  //   return this.orderService.addItemToOrder(customerId, body.productId, body.quantity);
  // }

  // @Delete('remove')
  // async removeItem(@Req() req, @Body() body: { productId: string }) {
  //   const customerId = req.user.customerId;
  //   return this.orderService.removeItemFromOrder(customerId, body.productId);
  // }

  // @Delete('clear')
  // async clear(@Req() req) {
  //   const customerId = req.user.customerId;
  //   return this.orderService.clearOrder(customerId);
  // }
}