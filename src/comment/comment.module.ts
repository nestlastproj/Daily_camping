import { Controller, Get, Module } from '@nestjs/common';
import { commentController } from './comment.controller';
import { commentService } from './comment.service';
import { Comment } from 'src/entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Article } from 'src/entity/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article])],
  controllers: [commentController],
  providers: [commentService],
})
export class commentModule {}
