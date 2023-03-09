import { Body, Delete, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Injectable()
export class commentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  //댓글 목록
  getComments() {
    return this.commentRepository.find();
  }

  //댓글 상세조회
  async getCommentById(id: number) {
    return this.commentRepository.findOneBy({ id: id });
  }

  // 댓글 생성
  createComment(createCommentDto: CreateCommentDto) {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.save();

    return comment;
  }

  //댓글 수정
  async updateComment(id: number, updateComment: UpdateCommentDto) {
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw Error(`존재 하지 않는 게시글입니다.`);
    }
    comment.content = updateComment.content;
    comment.save();

    return comment;
  }

  //댓글 삭제
  async deleteComment(id: number) {
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw Error(`존재 하지 않는 게시글입니다.`);
    }
    comment.deletedAt = new Date();
    await comment.save();

    return comment;
  }
}
