import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MealModule } from '../meal/meal.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MealModule, AuthModule],
  exports: [OrderRepository, OrderService],
  providers: [OrderRepository, OrderService, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
