import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { articleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller('articles')
export class articleController {
  constructor(private readonly articleService: articleService) {}

  // 게시물 목록을 가져오는 API
  @Get()
  getArticles() {
    return this.articleService.getArticles();
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
  @Put('/:id')
  updateArticle(@Param('id') articleId: number, @Body() data: UpdateArticleDto) {
    try {
      return this.articleService.updateArticle(articleId, data);
    } catch (_e) {
      throw new NotFoundException('존재 하지 않는 게시판입니다 (id: $(id))');
    }
  }
  //게시물 삭제
  @Delete('/:id')
  deleteArticle(@Param('id') articleId: number) {
    return this.articleService.deleteArticle(articleId);
  }
}
