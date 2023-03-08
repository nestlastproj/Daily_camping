import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import _ from 'lodash';
import { v1 as UUID } from 'uuid';
import { Article } from 'src/entity/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class articleService {
  private article = [
    {
      id: 1,
      title: '첫번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
    {
      id: 2,
      title: '두번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
    {
      id: 3,
      title: '세번째 게시글 작성',
      content: 'ddddd',
      nickname: 'nilee23',
      createAT: '2023-02-27 11:11:11',
    },
  ];

  getarticle() {
    return this.article;
  }

  getArticleById(id: number) {
    return this.article.find((article) => {
      article.id === id;
    });
  }

  createarticle(createArticleDto: CreateArticleDto) {
    const { title, content, nickname, createAT } = createArticleDto;
    const article: Article = {
      id: UUID(),
      title,
      content,
      nickname,
      createAT,
    }
    this.article.push(article);
    return article;
  }

  updateArticle(id: number) {
    const article = this.getArticleById(id);
    return article;
  }

  //게시물 삭제
  deleteArticle(id: number) {
    return this.article.filter((article) => article.id !== id);
  }
}
