import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LikeService } from './like.service';

@Controller('')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

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
}
