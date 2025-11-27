import { IsNotEmptyString, UuidDecorator } from 'src/common/decorator';

export class CreateCategoryRequestDto {
  @IsNotEmptyString()
  name: string;

  @UuidDecorator(true)
  parentId?: string;
}
