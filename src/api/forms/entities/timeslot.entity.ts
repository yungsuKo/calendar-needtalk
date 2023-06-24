import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from './form.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @ManyToOne(() => Form, (form) => form.id)
  form: Form;
}
