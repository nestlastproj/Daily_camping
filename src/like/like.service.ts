import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ArticleLike, CommentLike } from 'src/entity/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private readonly articlelikeRepository: Repository<ArticleLike>,
    @InjectRepository(CommentLike)
    private readonly commentlikeRepository: Repository<CommentLike>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getarticlelike(req, articleId: number) {
    const userId = req.user.id;
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new Error('존재하지 않는 게시물입니다.');
    }
    const exist = await this.articlelikeRepository.find({ where: { user: userId, relationId: articleId } });
    if (!exist.length) {
      return await this.articlelikeRepository.insert({ user: { id: userId }, relationId: articleId });
    } else {
      return await this.articlelikeRepository.delete({ user: userId, relationId: articleId });
    }
  }

  async getcommentlike(req, commentId: number) {
    const userId = req.user.id;
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error('존재하지 않는 댓글입니다.');
    }
    const exist = await this.commentlikeRepository.find({ where: { user: userId, relationId: commentId } });
    if (!exist.length) {
      return await this.commentlikeRepository.insert({ user: { id: userId }, relationId: commentId });
    } else {
      return await this.commentlikeRepository.delete({ user: { id: userId }, relationId: commentId });
    }
  }
}
