import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { Request } from '../requests/entities/request.entity';
import { start } from 'repl';

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
    const newForm = {
      ...createFormDto,
      // user: user.userId
    };
    return await this.formRepository.save(newForm);
  }

  findAll() {
    return `This action returns all forms`;
  }

  findMyForms() {
    return 'myform list return';
  }

  async findOne(id: number, query) {
    const result = { days: [] };
    const days = [];
    const strId = String(id);
    const form = await this.formRepository.findOne({
      where: { id: strId },
      relations: ['user'],
    });
    const { available_slots, start_date, end_date, duration } = form;

    const requests = await this.requestRepository.find({
      where: { form: { id: form.id } },
      relations: ['user'],
    });

    /**
     * date를 구하여 days에 삽입
     */
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
      const day_slots = available_slots[i.getDay()];

      // day_slots가 존재할 경우에만 slots를 연산하여 추가
      if (day_slots === undefined) {
        continue;
      }
      const date = `${i.getFullYear()}-${(
        0 + String(i.getMonth() + 1)
      ).substring(-2)}-${(0 + String(i.getDate())).substring(-2)}`;
      const start_time_items = [];
      // spots를 구하여 days에 추가
      for (let i = 0; i < day_slots.length; i++) {
        let start_time_item = day_slots[i].start_time;
        while (day_slots[i].end_time - duration >= start_time_item) {
          const start_time_slot = Number(new Date(date));
          const start_time = new Date(
            start_time_slot + start_time_item * 1000 * 60 * 60,
          );
          start_time_items.push(start_time);
          start_time_item += 0.5;
        }
      }
      const requests_time = requests.map((request) =>
        request.req_start_time.toISOString(),
      );
      const start_time_result = start_time_items.filter(
        (i) =>
          // i보다 크고 i + duration
          !requests_time.includes(i.toISOString()),
      );

      days.push({
        date,
        slots: start_time_result,
        // spots
      });
    }
    console.log(new Date());
    // 서버, 클라이언트 시간대 통일하거나 일정한 규칙이 필요함. 리서치 해봐야 겠음.
    // days에 해당 날짜에 대한 timeslot을 추가
    // 요일별로 timeslot은 동일함.
    // days에 해당 날짜에 대한 timeslot을 추가
    // request에서 리턴된 날짜들에 대해서만 for문을 돌리면 될 듯
    result.days = days;
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
