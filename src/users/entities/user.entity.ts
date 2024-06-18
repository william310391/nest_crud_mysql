import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column({ default: 'user' })
  rol: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: 'user' })
  role: string;
}
