import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Weather extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ default: null })
  min_temperature: string;

  @Column({ default: null })
  max_temperature: string;

  @Column()
  percent: number;

  @Column()
  date: string;

  @Column()
  weatherstate: string;

  @Column()
  type: number;

  @Column()
  address: string;

  @Column()
  wind: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
