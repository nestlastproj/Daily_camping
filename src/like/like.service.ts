import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/entity/api/place.entity';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ArticleLike, CommentLike, PlaceLike } from 'src/entity/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private readonly articlelikeRepository: Repository<ArticleLike>,
    @InjectRepository(CommentLike)
    private readonly commentlikeRepository: Repository<CommentLike>,
    @InjectRepository(PlaceLike)
    private readonly placelikeRepository: Repository<PlaceLike>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async getarticlelike(req, articleId: number) {
    const userId = req.user.id;
    const article = await this.articleRepository.find({ where: { id: articleId } });
    if (!article.length) {
      throw new Error('존재하지 않는 게시물입니다.');
    }
    const exist = await this.articlelikeRepository.find({ where: { user: { id: userId }, relationId: articleId } });
    if (exist.length === 0) {
      return await this.articlelikeRepository.insert({ user: { id: userId }, relationId: articleId });
    } else {
      return await this.articlelikeRepository.delete({ user: userId, relationId: articleId });
    }
  }

  async getplacelike(req, placeId: number) {
    const userId = req.user.id;
    const place = await this.placeRepository.find({ where: { id: placeId } });
    if (!place.length) {
      throw new Error('존재하지 않는 캠핑장입니다.');
    }
    const exist = await this.placelikeRepository.find({ where: { user: { id: userId }, relationId: placeId } });
    if (exist.length === 0) {
      return await this.placelikeRepository.insert({ user: { id: userId }, relationId: placeId });
    } else {
      return await this.placelikeRepository.delete({ user: { id: userId }, relationId: placeId });
    }
  }

  async getcommentlike(req, commentId: number) {
    const userId = req.user.id;
    const comment = await this.commentRepository.find({ where: { id: commentId } });
    if (!comment.length) {
      throw new Error('존재하지 않는 댓글입니다.');
    }
    const exist = await this.commentlikeRepository.find({ where: { user: { id: userId }, relationId: commentId } });
    if (exist.length === 0) {
      return await this.commentlikeRepository.insert({ user: { id: userId }, relationId: commentId });
    } else {
      return await this.commentlikeRepository.delete({ user: { id: userId }, relationId: commentId });
    }
  }

  async countplacelike(relationId: number) {
    return await this.placelikeRepository.createQueryBuilder().select('relationId').where({ relationId }).getCount();
  }

  async getMyLike(req) {
    const userId = req.user.id;
    await this.placelikeRepository.find({ where: { id: userId } });
    return await this.placelikeRepository
      .createQueryBuilder('placelike')
      .select('placelike.relationId AS id')
      .addSelect('COUNT(*) AS count')
      .where({ user: { id: userId } })
      .groupBy('placelike.relationId')
      .orderBy('placelike.relationId')
      .getRawMany();
  }

  async getMyArticleLike(req) {
    const userId = req.user.id;
    await this.articlelikeRepository.find({ where: { id: userId } });
    return await this.articlelikeRepository
      .createQueryBuilder('articlelike')
      .select('articlelike.relationId AS id')
      .addSelect('COUNT(*) AS count')
      .where({ user: { id: userId } })
      .groupBy('articlelike.relationId')
      .orderBy('articlelike.relationId')
      .getRawMany();
  }

  async allPlaceLike() {
    return await this.placelikeRepository
      .createQueryBuilder('placelike')
      .select('placelike.relationId AS id')
      .addSelect('COUNT(*) AS count')
      .groupBy('placelike.relationId')
      .orderBy('placelike.relationId')
      .getRawMany();
  }

  async commentLikeCount(relationId: number) {
    return await this.commentlikeRepository
      .createQueryBuilder()
      .select('relationId')
      .where({ relationId })
      .andWhere({ relationType: 'comment' })
      .addSelect('COUNT(*) AS count')
      .getCount();
  }

  async articleLikeCount(relationId: number) {
    return await this.articlelikeRepository
      .createQueryBuilder()
      .select('relationId')
      .where({ relationId })
      .andWhere({ relationType: 'article' })
      .addSelect('COUNT(*) AS count')
      .getCount();
  }

  async placeLikeCount(relationId: number) {
    return await this.placelikeRepository
      .createQueryBuilder()
      .select('relationId')
      .where({ relationId })
      .andWhere({ relationType: 'place' })
      .addSelect('COUNT(*) AS count')
      .getCount();
  }
}
