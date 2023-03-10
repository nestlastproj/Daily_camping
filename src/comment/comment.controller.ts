import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { commentService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Controller('comments')
export class commentController {
  constructor(private readonly commentService: commentService) {}

  // 댓글 목록을 가져오는 API
  @Get('/:id')
  getComment(@Param('id') articleId: number) {
    return this.commentService.getComments(articleId);
  }

  // 댓글 상세보기
  @Get('/:id/:commentId')
  getCommentById(@Param('id') articleId: number, @Param('commentId') commentId: number) {
    return this.commentService.getCommentById(articleId, commentId);
  }

  // 댓글 생성
  @Post('/:id')
  createComment(@Param('id') articleId: number, @Body() data: CreateCommentDto) {
    return this.commentService.createComment(articleId, data);
  }

  // 댓글 수정
  @Put('/:id/:commentId')
  updateComment(@Param('id') articleId: number, @Param('commentId') commentId: number, @Body() data: UpdateCommentDto) {
    try {
      return this.commentService.updateComment(articleId, commentId, data);
    } catch (_e) {
      throw new NotFoundException('존재 하지 않는 게시판입니다 (id: $(id))');
    }
  }

  // 댓글 삭제
  @Delete('/:id/:commentId')
  deleteComment(@Param('id') articleId: number, @Param('commentId') commentId: number) {
    return this.commentService.deleteComment(articleId, commentId);
  }
}
