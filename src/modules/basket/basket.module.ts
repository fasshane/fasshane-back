import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { BasketRepository } from './basket.repository';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';

@Module({
  exports: [BasketRepository, BasketService],
  providers: [BasketRepository, BasketService, PrismaService, JwtService],
  controllers: [BasketController],
})
export class BasketModule {}
