import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Google 로그인을 시작하는 부분
    // pasport가 자동으로 GoogleStrategy를 실행시킴, google login page로 보냄
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(req) {
    // Google 로그인이 성공하고 나서 실행됨
    // 사용자 정보는 req.user에 저장됨
    // 이곳에서 사용자에게 적절한 응답을 보내주면 됩니다.
  }
}
