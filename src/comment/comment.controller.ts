import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { commentService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Controller('comments')
export class commentController {
  constructor(private readonly commentService: commentService) {}

  // 댓글 목록을 가져오는 API
  @Get()
  getComment() {
    return this.commentService.getComments();
  }

  // 댓글 상세보기
  @Get('/:id')
  getCommentById(@Param('id') commentId: number) {
    return this.commentService.getCommentById(commentId);
  }

  // 댓글 작성
  @Post()
  createComment(@Body() createComment: CreateCommentDto) {
    return this.commentService.createComment(createComment);
  }

  // 댓글 수정
  @Put('/:id')
  updateComment(@Param('id') commentId: number, @Body() data: UpdateCommentDto) {
    try {
      return this.commentService.updateComment(commentId, data);
    } catch (_e) {
      throw new NotFoundException('존재 하지 않는 게시판입니다 (id: $(id))');
    }
  }

  // 댓글 삭제
  @Delete('/:id')
  deleteComment(@Param('id') commentId: number) {
    return this.commentService.deleteComment(commentId);
  }
}
