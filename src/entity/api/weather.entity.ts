import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Weather extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  min_temperature: number;

  @Column()
  max_temperature: number;

  @Column()
  percent: number;

  @Column()
  date: number;

  @Column()
  weatherstate: string;

  @Column()
  type: number;

  @Column()
  address: string;

  @Column()
  wind: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
