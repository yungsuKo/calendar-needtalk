import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSlot } from './timeslot.entity';
import { FormStatus } from './form.enum';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.LIVE,
  })
  status: FormStatus;
}
