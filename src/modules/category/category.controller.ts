import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryRequestDto,
  UpdateCategoryDishesRequestDto,
  UpdateCategoryRequestDto,
} from './dto';
import { Auth } from 'src/common/decorator';
import { Role } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  @Get('/allCategories')
  async getAll() {
    return this.categoryService.getAllCategories();
  }

  @Auth(Role.ADMIN, Role.MANAGER)
  @Post('/create')
  createCategory(@Body() dto: CreateCategoryRequestDto) {
    return this.categoryService.createCategory(dto);
  }

  @Auth(Role.ADMIN, Role.MANAGER)
  @Patch('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryRequestDto,
  ) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Auth(Role.ADMIN, Role.MANAGER)
  @Delete('/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Auth(Role.ADMIN, Role.MANAGER)
  @Patch('/:id/dishes')
  updateCategoryDishes(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDishesRequestDto,
  ) {
    return this.categoryService.updateCategoryDishes(id, dto);
  }
}
