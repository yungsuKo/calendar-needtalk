import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSlot } from './timeslot.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
