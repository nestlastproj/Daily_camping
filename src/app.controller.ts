import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('main')
  main() {}

  @Get('/auth/login')
  @Render('login')
  getLogin() {}

  @Get('/auth/withdrawal')
  @Render('mypagewithdrawal')
  getDelete() {}

  @Get('/article/mypageArticle')
  @Render('mypagearticle')
  myArticle() {}

  @Get('/article/list')
  @Render('commuity')
  getArticleList() {}

  @Get('/article/write')
  @Render('commuWrite')
  getWriteArticle() {}

  @Get('/article/edit/:articleId')
  @Render('articleedit')
  articleEdit() {}

  @Get('/comment/mypagecomment')
  @Render('mypagecomment')
  comment() {}

  @Get('/place/placeList')
  @Render('place')
  placeList() {}

  @Get('/place/placeInfo')
  @Render('placedetail')
  placeInfo() {}

  @Get('/product/productList')
  @Render('product')
  productList() {}

  @Get('/recipe/recipeList')
  @Render('recipe')
  recipeList() {}

  @Get('/recipe/recipeInfo')
  @Render('recipedetail')
  recipeInfo() {}

  @Get('/review/mypageReview')
  @Render('mypagereview')
  myReview() {}

  @Get('/review/reviewWrite/:placeId')
  @Render('reviewWrite')
  reviewWrite() {}

  @Get('/review/reviewView')
  @Render('reviewView')
  reviewView() {}

  @Get('/review/edit')
  @Render('reviewedit')
  reviewEdit() {}
}
