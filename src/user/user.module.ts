import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/util/upload.multer';
import { ArticleService } from 'src/article/article.service';
import { CommentService } from 'src/comment/comment.service';
import { ArticleModule } from 'src/article/article.module';
import { CommentModule } from 'src/comment/comment.module';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchConfig } from 'src/config/elastic.config';
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Article, Comment]),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    ArticleModule,
    CommentModule,
    MulterModule.registerAsync({ useFactory: multerOptionsFactory }),
  ],
  providers: [UserService, ArticleService, CommentService, SearchService],
  exports: [UserService],
})
export class UserModule {}
