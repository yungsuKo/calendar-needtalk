import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
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
  status: string;

  @Column()
  timeslots: [TimeSlot];
}
