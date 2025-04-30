import { DoubleTransformDecorator, EnumDecorator, IsNotEmptyString } from 'src/common/decorator';
import { ProductType } from '@prisma/client';

export class ProductCreateRequestDto {
  @IsNotEmptyString(false, 'Name is required')
  name: string;

  @EnumDecorator(ProductType)
  type: ProductType;

  @DoubleTransformDecorator(true)
  count: number;

  @IsNotEmptyString(true)
  image: string;
}