import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MealController } from './meal.controller';
import { MealRepository } from './meal.repository';
import { MealService } from './meal.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [MealRepository, MealService],
  providers: [MealRepository, PrismaService, MealService, JwtService],
  controllers: [MealController],
})
export class MealModule {
}
