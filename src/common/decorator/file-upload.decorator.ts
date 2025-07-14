import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { env } from '../../config';

export function FileUploadInterceptor(field = 'image') {
  const fileSize = env.FILE_MAX_SIZE_MB * 1024 * 1024;

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field, {
        limits: { fileSize },
      }),
    ),
  );
}
