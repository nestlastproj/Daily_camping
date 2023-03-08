import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteArticleDto } from 'src/auth/dto/delete-user.dto';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getAllarticle(data: CreateArticleDto): Promise<Article[]> {
    return this.articleService.getAllarticle(data);
  }

  @Post()
  createArticle(@Body() data: CreateArticleDto, user: User) {
    return this.articleService.createArticle(data, user);
  }

  @Put('/:id')
  async updateArticle(@Param('id') id: number, @Body() data: UpdateArticleDto, user: User) {
    return await this.articleService.updateArticle(id, data);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id: number, user: User) {
    return await this.articleService.deleteArticle(id);
  }
}
