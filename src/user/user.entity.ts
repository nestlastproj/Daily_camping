import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar', { length: 10, select: false })
  password: string;

  @Column()
  phone: string;

  @Column()
  grade: number;

  @Index({ unique: true })
  @Column()
  nickname: string;

  @Column()
  admin: boolean;

  @Column()
  image: string;
}
