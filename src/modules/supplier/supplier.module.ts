import { Module } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  exports: [SupplierRepository, SupplierService],
  providers: [SupplierRepository, PrismaService, JwtService, SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {
}
