import { Form } from '../entities/form.entity';

export class CreateFormDto extends Form {
  id: never;
  timeSlots: [];
}
