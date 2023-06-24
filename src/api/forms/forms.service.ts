import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { TimeSlot } from './entities/timeslot.entity';
import { time } from 'console';

interface TimeSlotInterface {
  start: Date;
  end: Date;
}

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
  ) {}

  async create(createFormDto: CreateFormDto) {
    console.log(createFormDto);
    const { timeSlots, ...createForm } = createFormDto;
    const newForm = await this.formRepository.save(createForm);
    console.log(timeSlots);
    // for (const timeSlot of timeSlots) {
    //   console.log(typeof timeSlot);

    //   await this.timeSlotRepository.save({
    //     form: newForm,
    //     start: timeSlot.start,
    //     end: timeSlot.end,
    //   });
    // }

    timeSlots.forEach(async (timeSlot: { start: Date; end: Date }) => {
      const newTimeSlot = {
        form: newForm,
        ...timeSlot,
      };
      await this.timeSlotRepository.save(newTimeSlot);
    });

    // const newTimeslots = timeslots.forEach(async (timeSlot) => {
    //   return await this.timeSlotRepository.save(timeSlot);
    // });
    return;
  }

  findAll() {
    return `This action returns all forms`;
  }

  findMyForms() {
    return 'myform list return';
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
