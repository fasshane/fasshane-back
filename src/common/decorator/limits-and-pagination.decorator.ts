import { applyDecorators } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export function EnumDecorator(enumType: any, optional = false) {
  const decorators = [Expose(), IsEnum(enumType)];
  optional
    ? decorators.push(
      IsOptional(),
    )
    : decorators.push(
    );
  return applyDecorators(...decorators);
}
