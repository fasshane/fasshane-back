import { applyDecorators } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  registerDecorator,
} from 'class-validator';
import {
  transformToBoolean,
  transformToDate,
} from 'src/common/function/common';

export function UuidDecorator(optional = false) {
  const decorators = [IsString(), IsUUID(), IsNotEmpty(), Expose()];
  if (optional) {
    decorators.push(IsOptional());
  }
  return applyDecorators(...decorators);
}

export function BooleanTransformDecorator(optional = false) {
  const decorators = [
    Transform(({ value }) => transformToBoolean(value)),
    IsBoolean(),
    Expose(),
  ];
  if (optional) {
    decorators.push(IsOptional());
  }
  return applyDecorators(...decorators);
}

export function IntegerTransformDecorator(optional = false) {
  const decorators = [
    Transform(({ value }) => (value ? parseInt(value) : value)),
    IsNumber(),
    Expose(),
  ];
  if (optional) {
    decorators.push(IsOptional());
  }
  return applyDecorators(...decorators);
}

export function DoubleTransformDecorator(optional = false) {
  const decorators = [
    Transform(({ value }) => {
      if (value === null || value === undefined || value === '') {
        return value;
      }
      const parsed = parseFloat(value);
      return isNaN(parsed) ? value : parsed;
    }),
    IsNumber({}, { message: 'Значення має бути числом' }),
    Expose(),
  ];

  if (optional) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}

export function DoubleDecorator(optional = false) {
  const decorators = [IsDouble()];
  if (optional) {
    decorators.push(IsOptional());
  }
  return applyDecorators(...decorators);
}

export function IsDouble() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDouble',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          if (typeof value !== 'number') return false;
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        defaultMessage() {
          return 'Сума має бути числом з десятковою крапкою і не більше ніж 2 знаки після коми';
        },
      },
    });
  };
}

export function DateDecorator(optional = false) {
  const decorators = [
    Transform(({ value }) => transformToDate(value)),
    Expose(),
    IsDate(),
    Type(() => Date),
  ];
  if (optional) {
    decorators.push(IsOptional());
  }
  return applyDecorators(...decorators);
}

export function IsNotEmptyString(optional = false) {
  const decorators = [IsString()];
  optional ? decorators.push(IsOptional()) : decorators.push(IsNotEmpty());
  return applyDecorators(...decorators);
}
