import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { Review } from './review.entity';

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

  @Index({ unique: true })
  @Column()
  nickname: string;

  @Column()
  admin: boolean;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany((type) => Article, (article) => article.user, { eager: true })
  articles: Article[];

  @OneToMany((type) => Comment, (comment) => comment.user, { eager: true })
  comments: Comment[];

  @OneToMany((type) => Like, (like) => like.user, { eager: true })
  likes: Like[];

  @OneToMany((type) => Review, (review) => review.user, { eager: true })
  reviews: Review[];
}
