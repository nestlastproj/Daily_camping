import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>) {}

  getReviewList() {
    return this.reviewRepository.find();
  }

  getReviews(reviewId: number) {
    return this.reviewRepository.find({
      where: { id: reviewId },
    });
  }

  createReview(userId: number, data: ReviewDto, file?: Express.Multer.File) {
    return this.reviewRepository.insert({
      user: { id: userId },
      title: data.title,
      content: data.content,
      image: file.filename,
    });
  }

  updateReview(reviewId: number, data: ReviewDto, file?: Express.Multer.File) {
    return this.reviewRepository.update({ id: reviewId }, { title: data.title, content: data.content, image: file.filename });
  }

  deleteReview(reviewId: number) {
    return this.reviewRepository.delete({ id: reviewId });
  }
}
