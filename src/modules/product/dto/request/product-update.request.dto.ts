import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateRequestDto } from './product-create.request.dto';

export class ProductUpdateRequestDto extends PartialType(ProductCreateRequestDto) {
}