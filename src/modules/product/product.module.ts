import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { S3Module } from '../../s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [ProductController],
  providers: [ProductRepository, PrismaService, JwtService, ProductService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
