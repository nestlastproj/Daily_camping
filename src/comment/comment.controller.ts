import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/:id')
  getAllComment(@Param('id') id: number): Promise<Article> {
    return this.commentService.getAllComment(id);
  }

  @Post('/:id')
  createComment(@Param('id') articleId: number, @Body() data: CreateCommentDto): Promise<void> {
    return this.commentService.createComment(articleId, data);
  }

  // @Put('/:id/:commentId')
  // updateComment(@Param('id') articleId: number, @Param('commentId') commentId:number, @Body() data: UpdateCommentDto): Promise<Comment> {
  //   return this.commentService.updateComment(articleId, commentId, data);
  // }

  // @Delete('/:id/:commentid')
  // async deleteComment(@Param('id') id: number): Promise<void> {
  //   return await this.commentService.deleteComment(id);
  // }
}
