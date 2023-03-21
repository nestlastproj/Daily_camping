import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Render,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // render
  // ------------------------------------------

  @Get('view/:articleId')
  @Render('commuView.ejs')
  @UsePipes(ValidationPipe)
  getViewArticle(@Param('articleId') articleId: number) {
    return { articleId };
  }

  // ------------------------------------------

  @Get('/myArticle')
  @UseGuards(JwtAuthGuard)
  async getMyArticle(@Req() req, @Query('page') page: number = 1) {
    return this.articleService.getMyArticle(req, page);
  }

  @Get('search')
  async getArticles(@Query('page') page: number = 1) {
    return await this.articleService.getArticles(page);
  }

  @Get('myArticleEdit/:articleId')
  @UseGuards(JwtAuthGuard)
  async getMyArticleEdit(@Req() req, @Param('articleId') articleId: number) {
    return this.articleService.getMyArticleEdit(req, articleId);
  }

  @Post('write')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createArticle(@Req() req, @Body() data: CreateArticleDto, @UploadedFile() file?: Express.MulterS3.File) {
    return await this.articleService.createArticle(req, data, file);
  }

  @Get('/:articleId')
  @UsePipes(ValidationPipe)
  async getArticle(@Param('articleId') articleId: number) {
    return await this.articleService.getArticle(articleId);
  }

  @Put('/:articleId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateArticle(
    @Req() req,
    @Param('articleId') articleId: number,
    @Body() data: UpdateArticleDto,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    return await this.articleService.updateArticle(req, articleId, data, file);
  }

  @Delete('/:articleId')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Req() req, @Param('articleId') articleId: number) {
    return await this.articleService.deleteArticle(req, articleId);
  }
}
