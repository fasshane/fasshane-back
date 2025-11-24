import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from '../../config';
import { UserRepository } from '../../modules/user/user.repository';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer '))
      throw new ForbiddenException('Токен відсутній');

    const token = authHeader.split(' ')[1];
    let payload: any;
    try {
      payload = this.jwtService.verify(token, { secret: env.JWT_SECRET });
    } catch {
      throw new ForbiddenException('Недійсний або прострочений токен');
    }

    console.log('pay', payload);
    // DB перевірка тут
    const user = await this.userRepository.findUserById(payload.id);
    if (!user) throw new UnauthorizedException('Користувача не знайдено');
    if (user.status === 'BLOCKED')
      throw new UnauthorizedException('Користувач заблокований');

    req.user = user;
    return true;
  }
}
