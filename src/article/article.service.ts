import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly searchService: SearchService,
  ) {}

  async getArticles(page) {
    const take = 6;

    const [articles, total] = await this.articleRepository.findAndCount({
      take,
      skip: (page - 1) * take,
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

    const totalPage = Math.ceil(total / take);

    const pageGroup = Math.ceil(page / 5);

    let lastPage = pageGroup * 5;

    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

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

  async createArticle(req, data: ArticleDto, file?: Express.MulterS3.File) {
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
    const articleInsert = await this.articleRepository.insert(aritcle);
    const aritcleId = await articleInsert.identifiers[0].id;
    await this.findIndex(aritcleId);
  }

  async findIndex(aritcleId) {
    const allfind = await this.articleRepository.findOne({ where: { id: aritcleId } });
    const keyword = '게시물';
    this.searchService.createDocument(allfind, keyword);
  }

  async updateArticle(req, articleId, data: ArticleDto, file?: Express.MulterS3.File) {
    const userId = req.user.id;
    const article = { user: { id: userId }, title: data.title, content: data.content };
    if (file) {
      const filename = file.key;
      article['image'] = filename;
    }
    const updateData = await this.articleRepository.findOne(articleId);
    if (JSON.stringify(updateData) !== JSON.stringify(article)) {
      await this.articleRepository.update(articleId, article);
      const searchData = await this.searchIndex(articleId);
      await this.searchService.updateDocument(searchData, article);
    }
  }

  async deleteArticle(req, articleId: number) {
    const userId = req.user.id;

    await this.commentRepository.delete({ articles: { id: articleId } });

    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    const searchData = await this.searchIndex(articleId);

    if (!article) {
      throw new Error('존재 하지 않는 게시물 입니다');
    }
    await this.articleRepository.delete({ user: { id: userId }, id: articleId });
    await this.searchService.deleteArticleDocument(searchData, articleId);
  }

  async searchIndex(articleId) {
    const keyword = '게시물';
    return await this.searchService.indexSearch(articleId, keyword);
  }
}
