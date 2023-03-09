import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto';
import { Article } from 'src/entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArticleDto } from './update-article.dto';
import { User } from 'src/entity/user.entity';

@Injectable()
export class articleService {
  articles: any;
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // 게시판 목록
  getArticles() {
    return this.articleRepository.find();
  }

  //게시판 상세조회
  async getArticleById(id: number): Promise<any> {
    return this.articleRepository.findOne({ relations: ['comments'], where: { id } });
  }

  //게시판 생성
  async createarticle(createArticleDto: CreateArticleDto) {
    const article = new Article();
    article.title = createArticleDto.title;
    article.content = createArticleDto.content;
    article.save();

    return article;
  }

  //게시판 수정
  async updateArticle(id: number, updateArticle: UpdateArticleDto) {
    const article = await this.getArticleById(id);
    if (!article) {
      throw Error('존재 하지 않는 게시글입니다.');
    }
    article.title = updateArticle.title;
    article.content = updateArticle.content;
    article.save();

    return article;
  }

  //게시물 삭제
  async deleteArticle(id: number) {
    const article = await this.getArticleById(id);
    if (!article) {
      throw Error('존재 하지 않는 게시물 입니다.');
    }
    article.deletedAt = new Date();
    console.log(article);
    article.save();

    return article;
  }
}
