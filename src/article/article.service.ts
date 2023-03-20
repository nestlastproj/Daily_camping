import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
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
      select: ['id', 'title', 'content'],
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
    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      data: articles.map((article) => {
        const { id, title, content, createdAt } = article;
        return { id, title, content, createdAt };
      }),
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  getArticle(articleId: number) {
    return this.articleRepository.findOne({ where: { id: articleId } });
  }

  async getMyArticleEdit(req, articleId: number) {
    const userId = req.user.id;
    return this.articleRepository.findOne({ where: { id: articleId, user: { id: userId } } });
  }

  async paginates(req, page) {
    const userId = req.user.id;
    const take = 6;
    const [articles, total] = await this.articleRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { user: { id: userId } },
    });

    // 전체 상품 수 : total

    // 총페이지 : last
    const totalPage = Math.ceil(total / take);

    // 한 그룹당 5개 페이지
    const pageGroup = Math.ceil(page / 5);

    // 한 그룹의 마지막 페이지 번호
    let lastPage = pageGroup * 5;

    // 한 그룹의 첫 페이지 번호
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    // 만약 마지막 페이지 번호가 총 페이지 수 보다 크다면
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      articles,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  async createArticle(req, data: CreateArticleDto, file?: Express.MulterS3.File) {
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
      throw new Error('존재 하지 않는 게시물 입니다');
    }
    return await this.articleRepository.softDelete({ user: { id: userId }, id: articleId });
  }
}
