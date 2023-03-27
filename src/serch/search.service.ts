import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { NumberType } from 'aws-sdk/clients/pinpointsmsvoicev2';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // searchIndexCreate() {
  //   this.elasticsearchService.indices.create({
  //     index: 'search',
  //   });
  // }

  async createDocument(document, keyword): Promise<any> {
    document.keyword = keyword;
    await this.elasticsearchService.index({
      index: 'search',
      body: document,
    });
  }

  async getDocument(page: number, keyword: string): Promise<any> {
    // const take = 6;
    const result = await this.elasticsearchService.search({
      index: 'search',
      // from: take * (page - 1),
      size: 10000,
      query: {
        query_string: {
          query: `*${keyword}*`,
          fields: ['name', 'address', 'city', 'datailcity', 'category'],
        },
      },
    });
    return result.hits.hits;
  }

  // async getDocument(page: number, keyword: string): Promise<any> {
  //   if (keyword === '캠핑장') {
  //     const take = 6;
  //     const result = await this.elasticsearchService.search({
  //       index: 'search',
  //       from: take * (page - 1),
  //       size: take,
  //       query: {
  //         query_string: {
  //           query: `*${keyword}*`,
  //           fields: ['name', 'address', 'city', 'datailcity', 'category'],
  //         },
  //       },
  //     });
  //     return result.hits.hits;
  //   } else if (keyword === '캠핑용품') {
  //     const take = 6;
  //     const result = await this.elasticsearchService.search({
  //       index: 'search',
  //       from: take * (page - 1),
  //       size: take,
  //       query: {
  //         query_string: {
  //           query: `*${keyword}*`,
  //           fields: ['name'],
  //         },
  //       },
  //     });
  //     return result.hits.hits;
  //   } else if (keyword === '레시피') {
  //     const take = 8;
  //     const result = await this.elasticsearchService.search({
  //       index: 'search',
  //       from: take * (page - 1),
  //       size: take,
  //       query: {
  //         query_string: {
  //           query: `*${keyword}*`,
  //           fields: ['name'],
  //         },
  //       },
  //     });
  //     return result.hits.hits;
  //   }
  // }

  async updateDocument(indexName: string, id: string, document: any): Promise<any> {
    await this.elasticsearchService.update({
      index: indexName,
      id: id,
      body: { doc: document },
    });
  }

  async deleteDocument(keyword: string): Promise<any> {
    await this.elasticsearchService.deleteByQuery({
      index: 'search',
      query: {
        match: {
          keyword: keyword,
        },
      },
    });
  }
}
