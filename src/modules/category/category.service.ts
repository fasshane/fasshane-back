import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }
}
