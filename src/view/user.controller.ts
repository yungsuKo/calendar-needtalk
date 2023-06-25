import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  @Render('pages/signup')
  getIndex() {
    return { message: 'hello' };
  }
}
