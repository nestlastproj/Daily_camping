import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  name: string;

  @Column({ length: 3000 })
  content: string;

  @Column()
  image: string;

  @Column()
  url: string;

  @Column()
  views: string;

  @Column({ length: 3000 })
  contentimage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
