import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeSlot } from './timeslot.entity';
import { FormStatus } from './form.enum';
import { User } from 'src/api/users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.forms)
  user: User;
}
