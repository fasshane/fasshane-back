import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';

/**
 * Комбінує JWT-автентифікацію та перевірку ролей.
 * Використання: @Auth(Role.ADMIN, Role.MANAGER)
 */
export const Auth = (...roles: Role[]) =>
  applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
