import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { multerOptionsFactory } from 'src/util/upload.multer';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), MulterModule.registerAsync({ useFactory: multerOptionsFactory })],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
