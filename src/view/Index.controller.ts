import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get('/')
  @Render('index')
  getIndex() {
    return { message: 'hello' };
  }
}
