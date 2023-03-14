import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticle() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['title', 'content'],
      relations: ['comments'],
      order: { comments: { createdAt: 'DESC' } },
    });

    // return await this.articleRepository
    //   .createQueryBuilder('article')
    //   .select('article.title')
    //   .select('article.content')
    //   .leftJoinAndSelect('article.comments', 'comment')
    //   .orderBy('comment.createdAt', 'DESC')
    //   .getMany();
  }

  async paginate(page) {
    const take = 6;

    const [articles, total] = await this.articleRepository.findAndCount({
      take, // Limit; 한 페이지에 가져올 데이터의 제한 갯수
      skip: (page - 1) * take, // Offset; 이전의 요청 데이터 갯수 = 현재 요청이 시작되는 위치
    });

    return {
      data: articles.map((article) => {
        const { title, content, createdAt } = article;
        return { title, content, createdAt };
      }),
      meta: {
        total,
        page,
        last: Math.ceil(total / take),
      },
    };
  }

  async createArticle(req, data: CreateArticleDto, file?: Express.Multer.File) {
    const userId = req.user.id;
    return await this.articleRepository.insert({
      user: { id: userId },
      title: data.title,
      content: data.content,
      image: file.filename,
    });
  }

  async updateArticle(req, articleId: number, data: UpdateArticleDto, file?: Express.Multer.File) {
    const userId = req.user.id;
    return await this.articleRepository.update(articleId, {
      user: { id: userId },
      title: data.title,
      content: data.content,
      image: file.filename,
    });
  }

  async deleteArticle(req, articleId: number) {
    const userId = req.user.id;
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new Error('이미 삭제된 게시물 입니다');
    } else {
      return await this.articleRepository.softDelete({ user: { id: userId }, id: articleId });
    }
  }
}
