import { PartialType } from '@nestjs/mapped-types';
import { SupplierCreateRequestDto } from './supplier-create.request.dto';
import { SupplierProductDto } from './product.dto';
import { IsArray, IsOptional } from 'class-validator';

export class SupplierUpdateRequestDto extends PartialType(SupplierCreateRequestDto) {
  @IsOptional()
  @IsArray({ message: 'Products must be an array' })
  products: SupplierProductDto[];
}