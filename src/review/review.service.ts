import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

  getReviewList() {
    return this.reviewRepository.find();
  }

  getReviews(reviewId: number) {
    return this.reviewRepository.find({
      where: { id: reviewId },
    });
  }

  createReview(req, placeId: number, data: ReviewDto, file?: Express.Multer.File) {
    const userId = req.user.id;
    return this.reviewRepository.insert({
      user: { id: userId },
      places: { id: placeId },
      title: data.title,
      content: data.content,
      image: file.filename,
    });
  }

  updateReview(req, reviewId: number, data: ReviewDto, file?: Express.Multer.File) {
    const userId = req.user.id;
    return this.reviewRepository.update(
      { user: { id: userId } },
      { id: reviewId, title: data.title, content: data.content, image: file.filename },
    );
  }

  deleteReview(req, reviewId: number) {
    const userId = req.user.id;
    return this.reviewRepository.delete({ user: { id: userId }, id: reviewId });
  }
}
