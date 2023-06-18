import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}
  async googleLogin(req) {
    // strategy를 통해서 넘어온 user의 정보를 가지고 와서 유저가 없으면 생성, 있으면 로그인을 구현
    const {
      user: { googleId, email, name, photo },
    } = req;
    const findUser = await this.usersService.findOne(email);

    console.log('exist', findUser);
    if (!findUser) {
      await this.usersService.create({
        googleId,
        name,
        email,
      });
    }
  }
}
