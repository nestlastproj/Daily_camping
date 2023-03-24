import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LikeService } from './like.service';

@Controller('')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get('commentlikecount/:relationId')
  async commentLikeCount(@Param('relationId') relationId: number) {
    return await this.likeService.commentLikeCount(relationId);
  }

  @Get('article/likecount/:relationId')
  async articleLikeCount(@Param('relationId') relationId: number) {
    return await this.likeService.articleLikeCount(relationId);
  }

  @Get('place/likecount/:relationId')
  async placeLikeCount(@Param('relationId') relationId: number) {
    return await this.likeService.placeLikeCount(relationId);
  }
  //---------------------------------------------
  @Get('/place/:relationId/countlike')
  async countplacelike(@Param('relationId') relationId: number) {
    return await this.likeService.countplacelike(relationId);
  }

  @Post('/articles/:articleId/like')
  @UseGuards(JwtAuthGuard)
  async getarticlelike(@Req() req, @Param('articleId') articleId: number) {
    return await this.likeService.getarticlelike(req, articleId);
  }

  @Post('/comments/:commentId/like')
  @UseGuards(JwtAuthGuard)
  async getcommentlike(@Req() req, @Param('commentId') commentId: number) {
    return await this.likeService.getcommentlike(req, commentId);
  }

  @Post('/place/:placeId/like')
  @UseGuards(JwtAuthGuard)
  async getplacelike(@Req() req, @Param('placeId') placeId: number) {
    return await this.likeService.getplacelike(req, placeId);
  }

  @Get('myplacelike')
  @UseGuards(JwtAuthGuard)
  async getMyLike(@Req() req) {
    return await this.likeService.getMyLike(req);
  }

  @Get('myArticleLike')
  @UseGuards(JwtAuthGuard)
  async getMyArticleLike(@Req() req) {
    return await this.likeService.getMyArticleLike(req);
  }

  @Get('allplacelike')
  async allPlaceLike() {
    return this.likeService.allPlaceLike();
  }
}
