// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy, JwtGuardStrategy } from '../../common/strategies';
import { JwtAuthGuard } from '../../common/guards';
import { UserModule } from '../user/user.module';
import { env } from '../../config';
import { MailModule } from '../../shared';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtGuardStrategy,
    JwtAuthGuard,
    GoogleStrategy,
  ],
  exports: [JwtAuthGuard, JwtModule, UserModule],
})
export class AuthModule {}
