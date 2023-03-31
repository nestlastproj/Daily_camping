import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createDocument(document, keyword): Promise<any> {
    document.keyword = keyword;
    await this.elasticsearchService.index({
      index: 'search',
      body: document,
    });
  }

  async getDocument(keyword: string): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: 'search',
      size: 10000,
      query: {
        query_string: {
          query: `*${keyword}*`,
          fields: ['name', 'title', 'content', 'address', 'city', 'datailcity', 'category'],
        },
      },
    });
    return result.hits.hits;
  }

  async updateDocument(searchData, aritcle): Promise<any> {
    await this.elasticsearchService.update({
      index: 'search',
      id: searchData[0]._id,
      doc: {
        title: aritcle.title,
        content: aritcle.content,
        image: aritcle.image,
      },
    });
  }

  async deleteDocument(searchData): Promise<any> {
    await this.elasticsearchService.deleteByQuery({
      index: 'search',
      query: {
        bool: {
          must: [
            {
              match: {
                _id: searchData[0]._id,
              },
            },
            {
              match: {
                keyword: searchData[0]._source.keyword,
              },
            },
          ],
        },
      },
    });
  }

  async indexSearch(articleId: number, keyword: string) {
    const result = await this.elasticsearchService.search({
      index: 'search',
      query: {
        bool: {
          must: [
            {
              match: {
                id: articleId,
              },
            },
            {
              match: {
                keyword: keyword,
              },
            },
          ],
        },
      },
    });
    return result.hits.hits;
  }
}
