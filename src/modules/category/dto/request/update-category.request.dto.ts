import { IsNotEmptyString, UuidDecorator } from 'src/common/decorator';

export class UpdateCategoryRequestDto {
  @IsNotEmptyString()
  name: string;

  @UuidDecorator(true)
  parentId?: string;
}
