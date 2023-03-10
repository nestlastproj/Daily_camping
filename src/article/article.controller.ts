import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getAllarticle() {
    return this.articleService.getAllarticle();
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

  @Delete('/:articleId')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Req() req, @Param('articleId') articleId: number) {
    return await this.articleService.deleteArticle(req, articleId);
  }
}
