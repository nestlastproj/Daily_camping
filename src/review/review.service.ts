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
    const filename = file.key
    return this.reviewRepository.insert({
      user: { id: userId },
      places: { id: placeId },
      title: data.title,
      content: data.content,
      image: filename,
    });
  }

  updateReview(req, reviewId: number, data: ReviewDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const filename = file.key
    return this.reviewRepository.update(
      { user: { id: userId } },
      { id: reviewId, title: data.title, content: data.content, image: filename },
    );
  }

  deleteReview(req, reviewId: number) {
    const userId = req.user.id;
    return this.reviewRepository.delete({ user: { id: userId }, id: reviewId });
  }
}
