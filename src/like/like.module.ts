import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
