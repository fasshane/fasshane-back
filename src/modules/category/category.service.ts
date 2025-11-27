import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import {
  CreateCategoryRequestDto,
  UpdateCategoryDishesRequestDto,
  UpdateCategoryRequestDto,
} from './dto';

@Injectable()
export class CategoryService {
  constructor(readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }

  async createCategory(dto: CreateCategoryRequestDto) {
    await this.ensureValidParent(dto.parentId);
    const slug = await this.categoryRepository.generateUniqueSlug(dto.name);

    return this.categoryRepository.createCategory({
      name: dto.name,
      parentId: dto.parentId ?? null,
      slug,
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryRequestDto) {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    await this.ensureValidParent(dto.parentId, id);

    const slug =
      dto.name !== existing.name
        ? await this.categoryRepository.generateUniqueSlug(dto.name, id)
        : undefined;

    return this.categoryRepository.updateCategory(id, {
      name: dto.name,
      parentId: dto.parentId ?? null,
      slug,
    });
  }

  async deleteCategory(id: string) {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.deleteCategory(id, existing.parentId ?? null);
  }

  async updateCategoryDishes(
    categoryId: string,
    dto: UpdateCategoryDishesRequestDto,
  ) {
    const existing = await this.categoryRepository.findById(categoryId);
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.updateCategoryDishes(
      categoryId,
      dto.dishIds ?? [],
    );
  }

  private async ensureValidParent(parentId?: string, currentId?: string) {
    if (!parentId) return;

    if (currentId && parentId === currentId) {
      throw new BadRequestException('Category cannot be its own parent');
    }

    let parent = await this.categoryRepository.findById(parentId);
    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    let ancestorId = parent.parentId;
    while (ancestorId) {
      if (ancestorId === currentId) {
        throw new BadRequestException(
          'Cannot assign a descendant category as parent',
        );
      }
      parent = await this.categoryRepository.findById(ancestorId);
      ancestorId = parent?.parentId;
    }
  }
}
