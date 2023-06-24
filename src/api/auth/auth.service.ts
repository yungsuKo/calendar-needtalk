import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { UsersService } from 'src/api/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async googleLogin(req, res) {
    try {
      // strategy를 통해서 넘어온 user의 정보를 가지고 와서 유저가 없으면 생성, 있으면 로그인을 구현
      const {
        user: { googleId, email, name },
      } = req;
      let accessToken: string;
      let refreshToken: string;

      const findUser = await this.usersService.findOne(email);
      // 회원가입 되어있는 유저가 아닌 경우
      if (!findUser) {
        const googlelUser = this.usersRepository.create({
          googleId,
          name,
          email,
        });
        await this.usersRepository.save(googlelUser);
        // accessToken, refreshToken 생성
        const googlepayload = { id: googlelUser.id, email: googlelUser.email };
        accessToken = this.jwtService.sign(googlepayload, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
          expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
        });
        console.log(accessToken);
        refreshToken = this.jwtService.sign(googlepayload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
          expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
        });
        res.cookie('refreshToken', refreshToken, {
          expires: new Date(
            Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
          ),
          httpOnly: true,
        });
        return {
          ok: true,
          accessToken,
        };
      }
      // 회원가입이 되어있는 유저의 경우
      const findUserPayload = { userId: findUser.id, email: findUser.email };

      accessToken = this.jwtService.sign(findUserPayload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      });
      refreshToken = this.jwtService.sign(findUserPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
      });
      res.cookie('refreshToken', refreshToken, {
        expires: new Date(
          Date.now() + Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        ),
        httpOnly: true,
      });
      return {
        ok: true,
        accessToken,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, error: '로그인에 실패하였습니다.' };
    }
  }

  getAccessToken(req) {
    const userPayload = req.user;
    const accessToken = this.jwtService.sign(userPayload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });
    return accessToken;
  }
}
