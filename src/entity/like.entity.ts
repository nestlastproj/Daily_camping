import {
  BaseEntity,
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'relationType' } })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index()
  @Column()
  relationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.likes, { eager: false })
  user: User;
}

@ChildEntity('article')
export class ArticleLike extends Like {}

@ChildEntity('comment')
export class CommentLike extends Like {}

@ChildEntity('place')
export class PlaceLike extends Like {}
