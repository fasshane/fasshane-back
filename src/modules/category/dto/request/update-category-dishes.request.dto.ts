import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { transformToArray } from 'src/common/function';

export class UpdateCategoryDishesRequestDto {
  @Transform(({ value }) => transformToArray(value) ?? [])
  @IsArray()
  @IsString({ each: true })
  dishIds: string[];
}
