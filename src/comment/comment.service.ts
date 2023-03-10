import { Body, Delete, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Injectable()
export class commentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  //댓글 목록
  getComments(articleId: number) {
    return this.commentRepository.findOneBy({ id: articleId });
  }

  //댓글 상세조회
  async getCommentById(articleId: number, commentId: number) {
    return this.commentRepository.findOneBy({ id: articleId, id: commentId });
  }

  // 댓글 생성
  async createComment(articleId: number, data: CreateCommentDto) {
    const articles = await this.articleRepository.findOneBy({ id: articleId });
    if (!articles) {
      throw new Error('Article not found');
    }
    const comment = this.commentRepository.save({
      ...data,
      articles,
    });
    if (comment) {
      return 'success';
    }
    return 'fail';
  }

  //댓글 수정
  async updateComment(articleId: number, commentId: number, updateComment: UpdateCommentDto) {
    const comment = await this.getCommentById(articleId, commentId);
    if (!comment) {
      throw Error(`존재 하지 않는 게시글입니다.`);
    }
    comment.content = updateComment.content;
    comment.save();

    return comment;
  }

  //댓글 삭제
  async deleteComment(articleId: number, commentId: number) {
    const comment = await this.getCommentById(articleId, commentId);
    if (!comment) {
      throw Error(`존재 하지 않는 게시글입니다.`);
    }
    comment.deletedAt = new Date();
    await comment.save();

    return comment;
  }
}
