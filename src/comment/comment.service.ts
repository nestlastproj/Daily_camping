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

  async paginate(req, page) {
    const userId = req.user.id;
    const take = 6;
    const [comments, total] = await this.commentRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { user: { id: userId } },
    });

    // 전체 상품 수 : total

    // 총페이지 : last
    const totalPage = Math.ceil(total / take);

    // 한 그룹당 5개 페이지
    const pageGroup = Math.ceil(page / 5);

    // 한 그룹의 마지막 페이지 번호
    let lastPage = pageGroup * 5;

    // 한 그룹의 첫 페이지 번호
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      comments,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

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
