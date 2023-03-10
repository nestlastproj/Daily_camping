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

  @Post()
  async createComment(@Body() data: CreateCommentDto) {
    return await this.commentService.createComment(data);
  }

  @Put('/:id')
  async updateComment(@Param('id') id: number, @Body() data: UpdateCommentDto) {
    return await this.commentService.updateComment(id, data);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: number) {
    return await this.commentService.deleteComment(id);
  }
}
