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
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getAllComment(articleId: number) {
    return await this.commentRepository.find({
      where: { articles: { id: articleId }, deletedAt: null },
    });
  }

  async createComment(req, articleId: number, data: CreateCommentDto) {
    const id = req.user.id;
    return await this.commentRepository.save({ user: { id: id }, articles: { id: articleId }, content: data.content });
  }

  async updateComment(req, articleId: number, commentId: number, data: UpdateCommentDto) {
    const id = req.user.id;
    return await this.commentRepository.update(id, {
      user: { id: id },
      articles: { id: articleId },
      id: commentId,
      content: data.content,
    });
  }

  async deleteComment(req, articleId: number, commentId: number) {
    const id = req.user.id;
    return await this.commentRepository.delete({
      user: { id: id },
      articles: { id: articleId },
      id: commentId,
    });
  }
}
