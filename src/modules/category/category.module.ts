import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  exports: [CategoryRepository, CategoryService],
  providers: [CategoryRepository, PrismaService, CategoryService, JwtService],
  controllers: [CategoryController],
})
export class CategoryModule {
}
