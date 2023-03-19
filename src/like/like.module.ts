import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/entity/api/place.entity';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ArticleLike, CommentLike, PlaceLike } from 'src/entity/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleLike, CommentLike, PlaceLike, Article, Comment, Place])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
