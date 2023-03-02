import { Controller, Get, Module } from '@nestjs/common';
import { commentController } from './comment.controller';
import { commentService } from './comment.service';

@Module({
  controllers: [commentController],
  providers: [commentService],
})
export class commentModule {}
