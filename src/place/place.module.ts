import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ArticleLike, CommentLike, Like, PlaceLike } from 'src/entity/like.entity';
import { LikeModule } from 'src/like/like.module';
import { LikeService } from 'src/like/like.service';
import { Place } from '../entity/api/place.entity';
import { PlaceController } from '../place/place.controller';
import { PlaceService } from '../place/place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Like, Article, Comment, ArticleLike, CommentLike, PlaceLike]),
    HttpModule,
    LikeModule,
  ],
  controllers: [PlaceController],
  providers: [PlaceService, LikeService],
})
export class PlaceModule {}
