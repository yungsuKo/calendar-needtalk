import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { TimeSlot } from './entities/timeslot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, TimeSlot])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
