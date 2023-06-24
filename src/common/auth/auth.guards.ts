import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTRefreshGuard extends AuthGuard('refresh') {}

@Injectable()
export class JWTAccessGuard extends AuthGuard('access') {}
