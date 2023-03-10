import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticle(createArticleDto: CreateArticleDto): Promise<Article[]> {
    const articles = this.articleRepository.find({
      where: { deletedAt: null },
      select: ['title', 'content'],
    });
    return articles;
  }

  async createArticle(data: CreateArticleDto, user: User) {
    const { title, content, image } = data;
    const article = this.articleRepository.create({ title, content, image, user });
    await this.articleRepository.save(article);
  }

  async updateArticle(id: number, data: UpdateArticleDto) {
    const { title, content, image } = data;
    const article = this.articleRepository.update(id, data);
  }

  async deleteArticle(id: number) {
    return this.articleRepository.delete(id);
  }
}
