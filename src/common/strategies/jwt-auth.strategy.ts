import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { env } from '../../config';
import { UserRepository } from '../../modules/user/user.repository';
import { UserStatus } from '@prisma/client';

@Injectable()
export class JwtGuardStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.userId) {
      throw new UnauthorizedException();
    }
    //
    // const user = await this.userRepository.findUserById(payload.userId);
    // console.log('User', user);
    // // якщо нема — відмовити
    // if (!user) {
    //   throw new UnauthorizedException('Користувача не знайдено');
    // }
    //
    // // додаткові перевірки (статус, верифікація)
    // if (user.status === UserStatus.BLOCKED) {
    //   throw new UnauthorizedException('Користувач заблокований');
    // }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  }
}
