import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchConfig } from 'src/config/elastic.config';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { multerOptionsFactory } from 'src/util/upload.multer';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment]),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    MulterModule.registerAsync({ useFactory: multerOptionsFactory }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, SearchService],
  exports: [ArticleService],
})
export class ArticleModule {}
