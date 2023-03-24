import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { multerOptionsFactory } from 'src/util/upload.multer';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment]), MulterModule.registerAsync({ useFactory: multerOptionsFactory })],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
