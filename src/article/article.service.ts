import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class articleService {

private article = [];
  
private articlePassword = new Map()

getarticle(){
  return this.article;
}


getArticleById(id: number) {
 return this.article.find((article) => {return article.id === id});
  }

createArticle(title: string, content: string, password: number) {
  const articleId = this.article.length + 1;
  this.article.push({ id: articleId, title, content });
  this.articlePassword.set(articleId, password);
  return articleId;
}


updateArticle(id: number, title: string, content: string, password: number) {
  if (this.articlePassword.get(id) !== password) {
  throw new UnauthorizedException(
  `Article password is not correct. id: ${id}`,
  );
  }

  const article = this.getArticleById(id);
  if (_.isNil(article)) {
  throw new NotFoundException(`Article not found. id: ${id}`);
  }

  article.title = title;
  article.content = content;
}

//게시물 삭제
deleteArticle(id: number, password: number) {
  if (this.articlePassword.get(id) !== password) {
  throw new UnauthorizedException(
  `Article password is not correct. id: ${id}`,
  );
}
  this.article = this.article.filter((article) => article.id !== id);
}

}
