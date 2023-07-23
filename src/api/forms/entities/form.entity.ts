import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormStatus } from './form.enum';
import { User } from 'src/api/users/entities/user.entity';

export interface TimeSlotInterface {
  start_time: number;
  end_time: number;
}

export interface AvailableSlotInterface {
  sun: [TimeSlotInterface];
  mon: [TimeSlotInterface];
  tue: [TimeSlotInterface];
  wed: [TimeSlotInterface];
  thu: [TimeSlotInterface];
  fri: [TimeSlotInterface];
  sat: [TimeSlotInterface];
}

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

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  // 모든 시간 단위는 시간
  @Column()
  duration: number;

  // 모든 시간 단위는 시간
  @Column({ type: 'json' })
  available_slots: AvailableSlotInterface;

  @Column({ nullable: true })
  break_time_type: string;

  @Column({ nullable: true })
  break_time_duration: number;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.LIVE,
  })
  status: FormStatus;

  @ManyToOne(() => User, (user) => user.forms)
  user: User;
}
