import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { articleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller('article')
export class articleController {
  constructor(private readonly articleService: articleService) {}

  // 게시물 목록을 가져오는 API
  @Get()
  getArticle() {
    return this.articleService.getarticle();
  }

  // 게시물 상세보기 > 게시물 ID로 확인
  @Get('/:id')
  getArticleById(@Param('id') articleId: number) {
    return this.articleService.getArticleById(articleId);
  }

  //게시물 작성
  @Post()
  createArticle(@Body() createArticle: CreateArticleDto) {
    return this.articleService.createarticle(createArticle);
  }

  // 게시물 수정
  @Patch('/:id')
  updateArticle(@Param('id') articleId: number, @Body() data: UpdateArticleDto) {
    return this.articleService.updateArticle(articleId);

  //게시물 삭제
  @Delete('/:id')
  deleteArticle(@Param('id') articleId: number) {
    return this.articleService.deleteArticle(articleId);
  }
}
}
