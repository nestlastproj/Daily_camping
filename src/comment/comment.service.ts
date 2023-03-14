import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return await this.commentRepository.find({ where: { articles: { id: articleId }, deletedAt: null } });
  }

  async createComment(req, articleId: number, data: CreateCommentDto) {
    const userId = req.user.id;
    return await this.commentRepository.save({ user: { id: userId }, articles: { id: articleId }, content: data.content });
  }

  async updateComment(req, articleId: number, commentId: number, data: UpdateCommentDto) {
    const userId = req.user.id;
    return await this.commentRepository.update(commentId, {
      user: { id: userId },
      articles: { id: articleId },
      content: data.content,
    });
  }

  async deleteComment(req, articleId: number, commentId: number) {
    const userId = req.user.id;
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error('이미 삭제된 댓글입니다.');
    } else {
      return await this.commentRepository.softDelete({
        user: { id: userId },
        articles: { id: articleId },
        id: commentId,
      });
    }
  }
}
