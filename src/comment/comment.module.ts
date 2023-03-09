import { Controller, Get, Module } from '@nestjs/common';
import { commentController } from './comment.controller';
import { commentService } from './comment.service';
import { Comment } from 'src/entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [commentController],
  providers: [commentService],
})
export class commentModule {}
