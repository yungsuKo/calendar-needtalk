import { Form } from 'src/api/forms/entities/form.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '안녕하세요' })
  introduce: string;

  @Column({ type: 'json' })
  forms: Form[];
}
