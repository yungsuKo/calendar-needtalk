import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { Request } from '../requests/entities/request.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,

    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async create({ createFormDto, user }) {
    console.log(createFormDto);
    const {
      available_slots: { sun, mon, tue, wed, thu, fri, sat },
    } = createFormDto;
    console.log(user);
    const newForm = { ...createFormDto, user: user.userId };
    return await this.formRepository.save(newForm);
  }

  findAll() {
    return `This action returns all forms`;
  }

  findMyForms() {
    return 'myform list return';
  }

  async findOne(id: number, query) {
    let result;
    const strId = String(id);
    const form = await this.formRepository.findOne({
      where: { id: strId },
      relations: ['user'],
    });
    const { available_slots, start_date, end_date, duration } = form;

    const requests = await this.requestRepository.find({
      where: { form: form },
      relations: ['user'],
    });

    const { month } = query;
    let first_month_date: Date;
    let last_month_date: Date;

    if (month !== undefined) {
      first_month_date = new Date(month);
      last_month_date = new Date(month);
      last_month_date.setMonth(last_month_date.getMonth() + 1);
    } else {
      const now = new Date();
      // 한국시간 변환
      now.setHours(now.getHours() + 9);
      // first_month_date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}`);
      first_month_date = new Date(now.getFullYear(), now.getMonth());
      first_month_date.setHours(first_month_date.getHours() + 9);
      last_month_date = new Date(first_month_date);
      last_month_date.setMonth(last_month_date.getMonth() + 1);
    }

    let cal_start_date: Date;
    let cal_end_date: Date;
    if (end_date < first_month_date || start_date > last_month_date) {
      // 조회한 월에 available한 timeslot이 없는 경우
      cal_start_date = null;
      cal_end_date = null;
    } else if (start_date <= first_month_date && end_date >= last_month_date) {
      // 조회한 월 전체에 available한 timeslot이 있는 경우
      cal_start_date = first_month_date;
      cal_end_date = last_month_date;
    } else {
      if (start_date > first_month_date && end_date < last_month_date) {
        // start_date 부터 end_date까지 리턴
        cal_start_date = start_date;
        cal_end_date = end_date;
      } else if (start_date < first_month_date && end_date < last_month_date) {
        // first_month_date부터 end_date 까지 리턴
        cal_start_date = first_month_date;
        cal_end_date = end_date;
      } else if (start_date > first_month_date && end_date > last_month_date) {
        // start_date 부터 last_month_date까지 리턴
        cal_start_date = start_date;
        cal_end_date = last_month_date;
      }
    }

    for (
      let i = cal_start_date;
      i <= cal_end_date;
      i.setDate(i.getDate() + 1)
    ) {
      // i의 일자에 따라 available_slots을 찾아서 result에 추가
      // 이때 고려해야하는 것은 해당 i 요일에 available_slots이 존재하는지 여부
      const day_slots = available_slots[i.getDay()];
      for (let j = 0; j < day_slots.length; j += 1) {
        if (day_slots[j].end_date - day_slots[j].start_date < duration) {
          continue;
        }
        // 해당 시간범주 내에 속하는 request start_date를 가져옴
        const requests = await this.requestRepository.find({
          where: { form: { id: strId } },
        });
        // j의 시간에 따라 request가 존재하는지 확인
        // 존재하지 않으면 result에 추가
        // 존재한다면 continue
      }
      // 존재하지 않으면 continue
      // 존재한다면 request를 가져와서 해당 request의 시간을 제외했을 때 duration만큼의 시간이 확보되는지 확인
      // 확보된다면 result에 추가
      // 확보되지 않는다면 continue
    }
    // 해당 기간 range 중에 가능한 timeslot이 존재하는 일자만 찾아서 리턴
    // 고려해야할 점
    // 1. start_date, end_date에 존재하면서
    // 2. request가 존재하는 시간을 제외하고
    // 3. 요일별 available_slots을 고려하여
    // 3. duration만큼의 시간이 확보되는 timeslot을 찾아야 함.

    // result 포맷 : subject, description, status, user, available_date
    return result;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  async remove(id: string, user) {
    // form이 존재하는지 확인
    // form의 생성자가 user인지 확인
    // 맞으면 from과 모든 timeslot을 삭제 함.
    // 아니면 에러
    const form = await this.formRepository.findOne({ where: { id } });
    if (form.user !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }
    await this.formRepository.softDelete({ id });
    return `This action removes a #${form.subject} form`;
  }
}
