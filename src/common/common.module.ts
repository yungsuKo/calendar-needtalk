import { Module } from '@nestjs/common';

import { JWTAccessGuard, JWTRefreshGuard } from './auth/auth.guards';
import { JwtRefreshStrategy } from './auth/jwtRefreshStrategy';
import { JwtAccessStrategy } from './auth/jwtAccessStrategy';

@Module({
  imports: [],
  providers: [
    JWTAccessGuard,
    JWTRefreshGuard,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
  exports: [JWTAccessGuard, JWTRefreshGuard],
})
export class CommonModule {}
