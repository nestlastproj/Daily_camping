import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComment(id: number): Promise<Article> {
    const comment = await this.articleRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    return comment;
  }

  async createComment(articleId: number, data: CreateCommentDto): Promise<void> {
    const userId = 1;
    await this.commentRepository.insert({ user: { id: userId }, articles: { id: articleId }, content: data.content });
  }

  // async updateComment(articleId: number, commentId:number, data: UpdateCommentDto): Promise<Comment> {
  //   const userId = 1;
  //   await this.commentRepository.update({ user: { id: userId }, articles: { id: articleId }, commentid: { id: id }, content: data.content });
  // }

  // async deleteComment(id: number): Promise<void> {
  //   return this.commentRepository.delete(id);
  // }
}
