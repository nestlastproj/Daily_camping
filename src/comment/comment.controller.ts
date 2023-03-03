import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { commentService } from './comment.service';
import { CreateCommentDto } from './create-comment.dto';
import { DeleteCommentDto } from './delete-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Controller('comment')
export class commentController {
  constructor(private readonly commentService: commentService) {}

  // 댓글 목록을 가져오는 API
  @Get()
  getComment() {
    return this.commentService.getComment();
  }

  // 게시물 상세보기 > 게시물 ID로 확인
  @Get('/:id')
  getCommentById(@Param('id') commentId: number) {
    return this.commentService.getCommentById(commentId);
  }

  // 댓글 작성
  @Post()
  createcomment(@Body() data: CreateCommentDto): number {
    return this.commentService.createComment(data.title, data.content, data.nickname, data.createAT);
  }

  // 댓글 수정
  @Put('/:id')
  updateComment(@Param('id') commentId: number, @Body() data: UpdateCommentDto) {
    return this.commentService.updateComment(commentId, data.title, data.content, data.createAT);
  }

  // 댓글 삭제
  @Delete('/:id')
  deleteComment(@Param('id') commentId: number, @Body() data: DeleteCommentDto): void {
    return this.commentService.deleteComment(commentId);
  }
}
