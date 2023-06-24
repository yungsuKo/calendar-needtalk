import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { User } from '../users/entities/user.entity';
import { TimeSlot } from '../forms/entities/timeslot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, TimeSlot])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
