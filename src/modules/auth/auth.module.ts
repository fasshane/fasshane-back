import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from '../../common/strategies/jwt-auth.strategy';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GoogleStrategy } from '../../common/strategies/google-oauth.strategy';
import { UserModule } from '../user/user.module';
import { env } from '../../config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtGuardStrategy, JwtAuthGuard, GoogleStrategy],

})
export class AuthModule {
}
