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
  Query,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { JWTAccessGuard } from 'src/common/auth/auth.guards';
import { RequestsService } from '../requests/requests.service';

@Controller('api/forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
    private readonly requestsService: RequestsService,
  ) {}

  // @UseGuards(JWTAccessGuard)
  @Post()
  async create(@Body() createFormDto: CreateFormDto, @Req() req) {
    return await this.formsService.create({ createFormDto, user: req.user });
  }

  @Get()
  findAll(@Query() query: Record<string, any>) {
    console.log(query);
    return this.formsService.findAll();
  }

  @UseGuards(JWTAccessGuard)
  @Get('/my')
  findMyForms(@Req() req) {
    console.log(req.user);
    return this.formsService.findMyForms();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: Record<string, any>) {
    return this.formsService.findOne(+id, query);
  }

  @Get(':id/timeslots')
  findTimeslots(@Param('id') id: string, @Query() query: Record<string, any>) {
    return this.formsService.findOne(+id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  @UseGuards(JWTAccessGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.formsService.remove(id, req.user);
  }
}
