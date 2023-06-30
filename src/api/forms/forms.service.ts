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

  async findOne(id: number) {
    const strId = String(id);
    const form = await this.formRepository.findOne({
      where: { id: strId },
      relations: ['user'],
    });
    const { available_slots } = form;
    console.log(available_slots.sun);

    return form;
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
