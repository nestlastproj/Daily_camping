import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/open')
  @Render('open1')
  open1() {}

  @Get('/main')
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

  @Get('/search/searchResult')
  @Render('search')
  search() {}

  @Get('/review/reviewView')
  @Render('reviewView')
  reviewView() {}

  @Get('/review/edit')
  @Render('reviewedit')
  reviewEdit() {}

  @Get('/')
  @Render('open2')
  open2() {}
}
