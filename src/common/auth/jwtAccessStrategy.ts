import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // false로 해야 accessToken의 만료시간을 검사한다.
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    });
  }
  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}
