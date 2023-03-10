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

  async createComment(data: CreateCommentDto) {
    const userId = 1;

    const { content, articleId } = data;
    return await this.commentRepository.save({ user: { id: userId }, articles: { id: articleId }, content: data.content });
  }

  async updateComment(id: number, data: UpdateCommentDto) {
    const userId = 1;

    return await this.commentRepository.update(id, {
      user: { id: userId },
      articles: { id: data.articleId },
      content: data.content,
    });
  }

  async deleteComment(id: number) {
    return this.commentRepository.delete(id);
  }
}
