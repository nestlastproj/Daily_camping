import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import _ from 'lodash';

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

  private articlePassword = new Map();

  getarticle() {
    return this.article;
  }

  getArticleById(id: number) {
    return this.article.find((article) => {
      return article.id === id;
    });
  }

  createArticle(title: string, nickname: string, content: string, createAT: string) {
    const articleId = this.article.length + 1;
    this.article.push({ id: articleId, title, content, nickname, createAT });
    return articleId;
  }

  updateArticle(id: number, title: string, content: string, createAT: string) {
    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException(`Article not found. id: ${id}`);
    }

    article.title = title;
    article.content = content;
  }

  //게시물 삭제
  deleteArticle(id: number) {
    this.article = this.article.filter((article) => article.id !== id);
  }
}
