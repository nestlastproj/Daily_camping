import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleSearchParam } from 'src/entity/pageRequest.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Response } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getAllarticle() {
    return this.articleService.getAllarticle();
  }

  @Get('list')
  getarticlelist(@Res() res: Response) {
    return res.render('articlelist.ejs');
  }

  @Get('search')
  async searchAllarticle(@Query('page') page: number = 1) {
    return await this.articleService.paginate(page);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(@Req() req, @Body() data: CreateArticleDto) {
    return await this.articleService.createArticle(req, data);
  }

  @Put('/:articleId')
  @UseGuards(JwtAuthGuard)
  async updateArticle(@Req() req, @Param('articleId') articleId: number, @Body() data: UpdateArticleDto) {
    return await this.articleService.updateArticle(req, articleId, data);
  }

  @Delete('/delete/:articleId')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Req() req, @Param('articleId') articleId: number) {
    return await this.articleService.deleteArticle(req, articleId);
  }
}
