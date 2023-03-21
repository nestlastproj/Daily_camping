import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

  async getReviewList(reviewId: number) {
    return await this.reviewRepository.findOne({ where: { id: reviewId } });
  }

  async getReviews(reviewId: number) {
    return await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });
  }

  async paginate(req, page: number) {
    const userId = req.user.id;
    const take = 6;
    const [reviews, total] = await this.reviewRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { user: { id: userId } },
      order: { id: 'desc' },
    });

    // 전체 상품 수 : total

    // 총페이지 : last
    const totalPage = Math.ceil(total / take);

    // 한 그룹당 5개 페이지
    const pageGroup = Math.ceil(page / 5);

    // 한 그룹의 마지막 페이지 번호
    let lastPage = pageGroup * 5;

    // 한 그룹의 첫 페이지 번호
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      reviews,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  createReview(req, placeId: number, data: ReviewDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const review = {
      user: { id: userId },
      places: { id: placeId },
      title: data.title,
      content: data.content,
    };
    if (file) {
      const filename = file.key;
      review['image'] = filename;
    }
    return this.reviewRepository.insert(review);
  }

  updateReview(req, reviewId: number, data: ReviewDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const review = {
      user: { id: userId },
      title: data.title,
      content: data.content,
    };
    if (file) {
      const filename = file.key;
      review['image'] = filename;
    }
    return this.reviewRepository.update(reviewId, review);
  }

  deleteReview(req, reviewId: number) {
    const userId = req.user.id;
    return this.reviewRepository.delete({ user: { id: userId }, id: reviewId });
  }
}
