import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('review/:userId')
  @UseInterceptors(FileInterceptor('file'))
  createReview(@Param('userId') userId: number, @Body() data: ReviewDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file, 'controller111111111111111111');
    const filee = this.reviewservice.createReview(userId, data, file);
    return filee;
  }

  @Put('review/:reviewId')
  @UseInterceptors(FileInterceptor('file'))
  updateReview(@Param('reviewId') reviewId: number, @Body() data: ReviewDto, @UploadedFile() file: Express.Multer.File) {
    return this.reviewservice.updateReview(reviewId, data, file);
  }

  @Delete('review/:reviewId')
  deleteRewiew(@Param('reviewId') reviewId: number) {
    return this.reviewservice.deleteReview(reviewId);
  }
}
