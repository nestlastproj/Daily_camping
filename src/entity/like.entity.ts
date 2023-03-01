import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Article } from './article.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  relationId: string;

  @Column()
  relationType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.likes, { eager: false })
  user: User;

  @ManyToOne((type) => Article, (article) => article.likes_article, { eager: false })
  relation_article: Article;

  @ManyToOne((type) => Comment, (comment) => comment.likes_comment, { eager: false })
  relation_comment: Comment;
}
