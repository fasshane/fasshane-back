import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from '../../common/guards';
import { env } from '../../config';
import {
  MfaRequestDto,
  PasswordResetDto,
  ResetPasswordDto,
  SignupRequestDto,
  VerifyPasswordResetCodeDto,
} from './request';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    try {
      const { jwt } = await this.authService.oAuthLogin(req.user);
      return res.redirect(`${env.FRONTEND_URL}/auth?access_token=${jwt}`);
    } catch (e) {
      console.log(e);
      res.status(500).send({ success: false, message: e.message });
    }
  }

  @Post('signup')
  async signup(@Body() body: SignupRequestDto) {
    await this.authService.signup(body);
    return {
      success: true,
    };
  }

  @Post('login')
  async login(@Body() body: SignupRequestDto) {
    await this.authService.login(body.email, body.password);
    return { success: true };
  }

  @Patch('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('verify-mfa')
  async verifyMfaCode(@Body() body: MfaRequestDto) {
    return this.authService.verifyMfaCode(body);
  }

  @Post('password-reset')
  async passwordReset(@Body() body: PasswordResetDto) {
    await this.authService.passwordReset(body);
    return { success: true };
  }

  @Post('verify-password-reset-code')
  async verifyResetCode(@Body() body: VerifyPasswordResetCodeDto) {
    await this.authService.verifyPasswordResetCode(body);
    return { success: true };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.authService.resetPassword(body);
    return { success: true };
  }
}
