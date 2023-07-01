import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Request } from '../requests/entities/request.entity';
import { RequestsService } from '../requests/requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Request])],
  controllers: [FormsController],
  providers: [FormsService, RequestsService],
})
export class FormsModule {}
