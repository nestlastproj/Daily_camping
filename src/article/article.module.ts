import { Controller, Get, Module } from '@nestjs/common';
import { articleController } from './article.controller';
import { articleService } from './article.service';

@Module({
  controllers: [articleController],
  providers: [articleService],
})
export class articleModule {}