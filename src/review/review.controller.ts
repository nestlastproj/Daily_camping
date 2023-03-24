import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReviewDto } from '../dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewservice: ReviewService) {}

  @Get('search')
  async getPageReviews(@Query('page') page: number, @Query('placeId') placeId: number) {
    return await this.reviewservice.getPageReviews(page, placeId);
  }

  @Get('/reviews/:reviewId')
  getReviewList(@Param('reviewId') reviewId: number) {
    return this.reviewservice.getReviewList(reviewId);
  }

  @Get('/myReview')
  @UseGuards(JwtAuthGuard)
  getMyReview(@Req() req, @Query('page') page: number = 1) {
    return this.reviewservice.paginate(req, page);
  }

  @Get('detail')
  getReviews(@Query('reviewId') reviewId: number) {
    return this.reviewservice.getReviews(reviewId);
  }

  @Post('review/:placeId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  createReview(
    @Req() req,
    @Param('placeId') placeId: number,
    @Body() data: ReviewDto,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    return this.reviewservice.createReview(req, placeId, data, file);
  }

  @Put('review/:reviewId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  updateReview(
    @Req() req,
    @Param('reviewId') reviewId: number,
    @Body() data: ReviewDto,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    return this.reviewservice.updateReview(req, reviewId, data, file);
  }

  @Delete('review/:reviewId')
  @UseGuards(JwtAuthGuard)
  deleteRewiew(@Req() req, @Param('reviewId') reviewId: number) {
    return this.reviewservice.deleteReview(req, reviewId);
  }
}
