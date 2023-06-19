import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      ignoreExpiration: false, // false로 해야 accessToken의 만료시간을 검사한다.
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    });
  }
  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}
