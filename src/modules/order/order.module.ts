import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MealModule } from '../meal/meal.module';

@Module({
  imports: [MealModule],
  exports: [OrderRepository, OrderService],
  providers: [OrderRepository, OrderService, PrismaService, JwtService],
  controllers: [OrderController],
})
export class OrderModule {}
