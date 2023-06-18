import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    console.log('=====googleLogin 실행됨=====');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    console.log('=====googleLoginCallback 실행됨=====');
    await this.authService.googleLogin(req, res);
    return res.redirect('http://localhost:3000');
    // Google 로그인이 성공하고 나서 실행됨
    // 사용자 정보는 req.user에 저장됨
    // 이곳에서 사용자에게 적절한 응답을 보내주면 됩니다.
  }
}
