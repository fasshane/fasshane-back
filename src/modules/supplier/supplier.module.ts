import { Module } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { PrismaService } from 'nestjs-prisma';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ProductModule, AuthModule],
  exports: [SupplierRepository, SupplierService],
  providers: [SupplierRepository, PrismaService, SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
