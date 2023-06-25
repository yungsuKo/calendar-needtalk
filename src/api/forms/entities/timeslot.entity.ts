import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';
import { TimeSlotStatus } from './form.enum';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  start: Date;

  @Column({ nullable: true })
  end: Date;

  @Column({ type: 'enum', enum: TimeSlotStatus, default: TimeSlotStatus.OPEN })
  @ManyToOne(() => Form, (form) => form.id)
  form: Form;
}
