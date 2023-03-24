import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Delete('/allcomment/delete/:articleId')
  async allCommentDelete(@Param('articleId') articleId: number, commentId) {
    return await this.commentService.allCommentDelete(articleId, commentId);
  }

  @Get('/count/:articleId')
  async commentCount(@Param('articleId') articleId: number) {
    return await this.commentService.commentCount(articleId);
  }

  @Get('/mycomment')
  @UseGuards(JwtAuthGuard)
  async myComment(@Req() req, @Query('page') page: number = 1) {
    return this.commentService.myComment(req, page);
  }

  @Get('/mycomment/:articleId')
  @UseGuards(JwtAuthGuard)
  async myArticleComment(@Param('articleId') articleId: number, @Query('page') page: number = 1) {
    return this.commentService.myArticleComment(articleId, page);
  }

  @Delete('/articles/:articleId/comments/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Req() req, @Param('articleId') articleId: number, @Param('commentId') commentId: number) {
    return await this.commentService.deleteComment(req, articleId, commentId);
  }

  @Post('/:articleId')
  @UseGuards(JwtAuthGuard)
  async createComment(@Req() req, @Param('articleId') articleId: number, @Body() data: CreateCommentDto) {
    return await this.commentService.createComment(req, articleId, data);
  }

  @Get('/:articleId/:commentId')
  @UseGuards(JwtAuthGuard)
  async getMyComment(@Req() req, @Param('articleId') articleId: number, @Param('commentId') commentId: number) {
    return await this.commentService.getMyComment(req, articleId, commentId);
  }

  @Put('/:articleId/:commentId')
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Req() req,
    @Param('articleId') articleId: number,
    @Param('commentId') commentId: number,
    @Body() data: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(req, articleId, commentId, data);
  }
}
