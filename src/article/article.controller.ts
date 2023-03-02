import {   Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe } from '@nestjs/common';
import { articleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { UpdateArticleDto } from './update-article.dto';


@Controller('article')  
export class articleController {
  constructor(private readonly articleService: articleService) {}

 
 // 게시물 목록을 가져오는 API
 @Get()
 getarticle() {
    return this.articleService.getarticle();
 }

 // 게시물 상세보기 > 게시물 ID로 확인
@Get('/:id')
getArticleById(@Param('id') articleId: number) {
    console.log('111111')
    return this.articleService.getArticleById(articleId);
}

//게시물 작성
@Post()
// @UsePipes(ValidationPipe)
createArticle(@Body() data: CreateArticleDto): number {
    return this.articleService.createArticle(
        data.title, 
        data.content, 
        data.password,
    );
}

// 게시물 수정
@Put('/:id')
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
@Delete('/:id')
deletArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
    ) {
    return this.articleService.deleteArticle(articleId, data.password);
 }
}