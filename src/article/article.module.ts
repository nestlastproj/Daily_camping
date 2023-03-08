import { Controller, Get, Module } from '@nestjs/common';
import { articleController } from './article.controller';
import { articleService } from './article.service';
import { Article } from 'src/entity/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [articleController],
  providers: [articleService],
})
export class articleModule {}
