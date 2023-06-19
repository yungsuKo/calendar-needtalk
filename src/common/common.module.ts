import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './auth/jwtRefreshStrategy';
import { JwtAccessStrategy } from './auth/jwtAccessStrategy';

@Module({
  imports: [],
  providers: [JwtRefreshStrategy, JwtAccessStrategy],
  exports: [JwtRefreshStrategy, JwtAccessStrategy],
})
export class CommonModule {}
