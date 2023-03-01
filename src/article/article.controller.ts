import {   Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, } from '@nestjs/common';
import { articleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller('article')  
export class articleController {
  constructor(private readonly articleService: articleService) {}

 
 // 게시물 목록을 가져오는 API
 @Get('/article')
 getarticle() {
    return this.articleService.getarticle();
 }

 // 게시물 상세보기 > 게시물 ID로 확인
@Get('/article/:id')
getArticleById(@Param('id') articleId: number) {
    return this.articleService.getArticleById(articleId);
}

//게시물 작성
@Post('/article')
createArticle(@Body() data: CreateArticleDto) {
    return this.articleService.createArticle(
        data.title, 
        data.content, 
        data.password
    );
}

// 게시물 수정
@Put('/article/:id')
updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
    ) {
    return this.articleService.updateArticle(
        articleId,
        data.title, 
        data.content, 
        data.password);
}

//게시물 삭제
@Delete('/article/:id')
deletArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto
    ) {
    return this.articleService.deleteArticle(articleId, data.password);
 }
}