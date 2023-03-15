import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // render
  // ------------------------------------------
  @Get('list')
  getarticlelist(@Res() res: Response) {
    return res.render('commuity.ejs');
  }

  @Get('write')
  getwritearticle(@Res() res: Response) {
    return res.render('commuWrite.ejs');
  }
  // ------------------------------------------
  @Get()
  getAllarticle() {
    return this.articleService.getAllarticle();
  }

  @Get('search')
  async searchAllarticle(@Query('page') page: number = 1) {
    return await this.articleService.paginate(page);
  }

  @Post('go')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createArticle(@Req() req, @Body() data: CreateArticleDto, @UploadedFile() file: Express.Multer.File) {
    return await this.articleService.createArticle(req, data, file);
  }

  @Put('/:articleId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateArticle(
    @Req() req,
    @Param('articleId') articleId: number,
    @Body() data: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.articleService.updateArticle(req, articleId, data, file);
  }

  @Delete('/delete/:articleId')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Req() req, @Param('articleId') articleId: number) {
    return await this.articleService.deleteArticle(req, articleId);
  }
}
