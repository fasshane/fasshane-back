import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from '../../common/guards/google-oauth.guard';
import { env } from '../../config';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    try {
      const { jwt, user } = await this.authService.oAuthLogin(req.user);
      console.log('jwt: ', jwt);

      return res.redirect(`${env.FRONTEND_URL}/auth?access_token=${jwt}`);
    } catch (e) {
      console.log(e);
      res.status(500).send({ success: false, message: e.message });
    }
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res) {
    try {
      const { jwt } = await this.authService.signup(signupDto);
      res.status(200).send({ success: true, token: jwt });
    } catch (e) {
      console.log(e);
      res.status(500).send({ success: false, message: e.message });
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    try {
      const { jwt } = await this.authService.login(body.email, body.password);
      res.status(200).send({ success: true, token: jwt });
    } catch (e) {
      console.log(e);
      res.status(500).send({ success: false, message: e.message });
    }
  }
}