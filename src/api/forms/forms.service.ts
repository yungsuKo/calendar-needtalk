import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
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
    const { available_slots } = form;

    const { month, date } = query;
    if (date !== undefined) {
      // month요청이 들어올 경우
      // 만약 month 쿼리가 들어오지 않은 경우 현재 일자를 기준으로 함.
      // timeslot을 연산, available한 timeslot이 있는 일자만 리턴
    } else {
      // const first_month_date = new Date(month);
      // const last_month_date = new Date(month);
      // last_month_date.setMonth(last_month_date.getMonth() + 1);
      // console.log(last_month_date);
      // date가 들어온 경우
      // 이때는 해당 일자의 available한 timeslot을 리턴
    }

    // result 포맷 : subject, description, status, user, available_slots
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
