import { Cipher } from 'crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from '../review.entity';
import { User } from '../user.entity';

@Index(['name'], { unique: true })
@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  detailcity: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column()
  url: string;

  @Column()
  x: string;

  @Column()
  y: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.place, { eager: false })
  user: User;

  @OneToMany((type) => Review, (review) => review.places, { eager: true })
  review: Review[];
}
