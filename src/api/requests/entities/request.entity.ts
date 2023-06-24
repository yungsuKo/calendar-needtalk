import { TimeSlot } from 'src/api/forms/entities/timeslot.entity';
import { User } from 'src/api/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.id)
  timeSlot: TimeSlot;

  @Column()
  message: string;
}
