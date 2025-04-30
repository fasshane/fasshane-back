import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  exports: [ProductRepository, ProductService],
  providers: [ProductRepository, PrismaService, JwtService, ProductService],
  controllers: [ProductController],
})
export class ProductModule {
}
