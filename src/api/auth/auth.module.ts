import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/googleStrategy';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtService, UsersService],
})
export class AuthModule {}
