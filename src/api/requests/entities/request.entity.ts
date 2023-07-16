import { Form } from 'src/api/forms/entities/form.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  message: string;

  @Column()
  req_start_time: Date;

  @ManyToOne(() => Form, (form) => form.id)
  form: Form;
}
