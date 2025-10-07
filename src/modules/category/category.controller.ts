import {
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(readonly categoryService: CategoryService) {}

  @Get('/allCategories')
  async getMe() {
    return this.categoryService.getAllCategories();
  }
}
