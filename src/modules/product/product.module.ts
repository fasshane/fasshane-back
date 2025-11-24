import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PrismaService } from 'nestjs-prisma';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { S3Module } from '../../s3/s3.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [S3Module, AuthModule],
  controllers: [ProductController],
  providers: [ProductRepository, PrismaService, ProductService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
