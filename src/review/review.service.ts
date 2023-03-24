import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private readonly reviewRepository: Repository<Review>) {}

  async getPageReviews(page: number, placeId: number) {
    const take = 2;

    const [reviews, total] = await this.reviewRepository.findAndCount({
      where: { places: { id: placeId } },
      relations: ['user'],
      withDeleted: true,
      order: { id: 'desc' },
      take, // Limit; 한 페이지에 가져올 데이터의 제한 갯수
      skip: (page - 1) * take, // Offset; 이전의 요청 데이터 갯수 = 현재 요청이 시작되는 위치
    });
    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    const value = {
      data: reviews,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
    return value;
  }

  async getReviewList(reviewId: number) {
    return await this.reviewRepository.findOne({ where: { id: reviewId } });
  }

  async getReviews(reviewId: number) {
    return await this.reviewRepository.findOne({
      where: { id: reviewId },
      withDeleted: true,
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
      withDeleted: true,
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
    if (!data.title) {
      throw new BadRequestException('제목을 입력해주세요.');
    }
    if (!data.content) {
      throw new BadRequestException('내용을 입력해주세요.');
    }
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
