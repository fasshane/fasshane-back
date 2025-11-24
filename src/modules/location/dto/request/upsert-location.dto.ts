import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpsertLocationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  wifiSsid?: string;

  @IsOptional()
  @IsString()
  wifiPassword?: string;

  // { instagram?: string; telegram?: string; facebook?: string; ... }
  @IsOptional()
  @IsObject()
  socialLinks?: Record<string, string>;

  // { mon: [{ from:"09:00", to:"18:00" }], tue: [...], ... }
  @IsOptional()
  @IsObject()
  openingHours?: Record<string, { from: string; to: string }[]>;
}
