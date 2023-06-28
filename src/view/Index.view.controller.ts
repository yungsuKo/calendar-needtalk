import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class IndexViewController {
  @Get('/')
  @Render('index')
  getIndex() {
    return { message: 'hello' };
  }
}
