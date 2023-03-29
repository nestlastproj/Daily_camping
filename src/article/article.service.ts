import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getArticles(page) {
    const take = 6;

    const [articles, total] = await this.articleRepository.findAndCount({
      take, // Limit; 한 페이지에 가져올 데이터의 제한 갯수
      skip: (page - 1) * take, // Offset; 이전의 요청 데이터 갯수 = 현재 요청이 시작되는 위치
      relations: ['user'],
      withDeleted: true,
      order: { id: 'desc' },
    });
    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      data: articles,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  getArticle(articleId: number) {
    return this.articleRepository.findOne({
      where: { id: articleId },
      withDeleted: true,
      relations: ['user'],
    });
  }

  async getMyArticleEdit(req, articleId: number) {
    const userId = req.user.id;
    return this.articleRepository.findOne({ where: { id: articleId, user: { id: userId } } });
  }

  async getMyArticle(req, page) {
    const userId = req.user.id;
    const take = 6;
    const [articles, total] = await this.articleRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { user: { id: userId } },
      withDeleted: true,
      order: { id: 'desc' },
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
    const aritcle = { user: { id: userId }, title: data.title, content: data.content };
    if (!data.title) {
      throw new BadRequestException('제목을 입력해주세요.');
    }
    if (!data.content) {
      throw new BadRequestException('내용을 입력해주세요.');
    }
    if (file) {
      const filename = file.key;
      aritcle['image'] = filename;
    }
    return await this.articleRepository.insert(aritcle);
  }

  async updateArticle(req, articleId: number, data: UpdateArticleDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const aritcle = { user: { id: userId }, title: data.title, content: data.content };
    if (file) {
      const filename = file.key;
      aritcle['image'] = filename;
    }
    return await this.articleRepository.update(articleId, aritcle);
  }

  async deleteArticle(req, articleId: number) {
    const userId = req.user.id;

    await this.commentRepository.delete({ articles: { id: articleId } });

    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new Error('존재 하지 않는 게시물 입니다');
    }
    return await this.articleRepository.delete({ user: { id: userId }, id: articleId });
  }
}
