import { Controller, Get, Render } from '@nestjs/common';

@Controller('/forms')
export class FormViewController {
  @Get('/create')
  @Render('pages/createForm')
  createForm() {
    return {};
  }
}
