import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReviewDto } from '../dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewservice: ReviewService) {}

  @Get('reviews/')
  getReviewList() {
    return this.reviewservice.getReviewList();
  }

  @Get('reviews/:id')
  getReviews(@Param('id') reviewId: number) {
    return this.reviewservice.getReviews(reviewId);
  }

  @Post('review/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  createReview(@Req() req, @Param('id') placeId:number @Body() data: ReviewDto, @UploadedFile() file: Express.Multer.File) {
    return this.reviewservice.createReview(req, placeId, data, file);
  }

  @Put('review/:reviewId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  updateReview(
    @Req() req,
    @Param('reviewId') reviewId: number,
    @Body() data: ReviewDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.reviewservice.updateReview(req, reviewId, data, file);
  }

  @Delete('review/:reviewId')
  @UseGuards(JwtAuthGuard)
  deleteRewiew(@Req() req, @Param('reviewId') reviewId: number) {
    return this.reviewservice.deleteReview(req, reviewId);
  }
}
