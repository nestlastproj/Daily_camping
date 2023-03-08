import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  content: string;

  @Column()
  phone: string;

  @Column()
  category: number;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.place, { eager: false })
  user: User;
}
