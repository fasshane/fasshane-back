import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '../../config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Токен відсутній або має некоректний формат',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      request.user = this.jwtService.verify(token, {
        secret: env.JWT_SECRET,
      });
      return true;
    } catch {
      throw new UnauthorizedException('Недійсний або прострочений токен');
    }
  }
}
