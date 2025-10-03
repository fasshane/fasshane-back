import { Auth } from './auth.decorator';
import { Role } from '@prisma/client';

/** Доступ лише для персоналу (адмін/менеджер). */
export const StaffOnly = () => Auth(Role.ADMIN, Role.MANAGER);
