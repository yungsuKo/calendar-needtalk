import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { AuthGuard } from '@nestjs/passport';
import { JWTAccessGuard } from 'src/common/auth/auth.guards';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  async create(@Body() createFormDto: CreateFormDto) {
    return await this.formsService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @UseGuards(JWTAccessGuard)
  @Get('/my')
  findMyForms(@Req() req) {
    console.log(req.user);
    return this.formsService.findMyForms();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}