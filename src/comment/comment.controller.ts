import { Body, Controller, Delete, Get, Param, Post, Put, Query, Render, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/mypagecomment')
  @Render('mypagecomment')
  comment() {}

  @Get('/mycomment')
  @UseGuards(JwtAuthGuard)
  async myComment(@Req() req, @Query('page') page: number = 1) {
    return this.commentService.paginate(req, page);
  }

  @Get('/mycomment/:articleId')
  @UseGuards(JwtAuthGuard)
  async myArticleComment(@Param('articleId') articleId: number, @Query('page') page: number = 1) {
    return this.commentService.paginates(articleId, page);
  }

  @Get('/:articleId')
  getAllComment(@Param('articleId') articleId: number) {
    return this.commentService.getAllComment(articleId);
  }

  @Post('/:articleId')
  @UseGuards(JwtAuthGuard)
  async createComment(@Req() req, @Param('articleId') articleId: number, @Body() data: CreateCommentDto) {
    return await this.commentService.createComment(req, articleId, data);
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

  @Delete('/:articleId/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Req() req, @Param('articleId') articleId: number, @Param('commentId') commentId: number) {
    return await this.commentService.deleteComment(req, articleId, commentId);
  }
}
