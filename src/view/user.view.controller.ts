import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserViewController {
  @Get('/')
  @Render('pages/signup')
  getIndex() {
    return { message: 'hello' };
  }
}
