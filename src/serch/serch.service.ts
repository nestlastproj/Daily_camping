import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SerchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex() {
    const index = 'my_index';
    const body = {
      settings: {
        analysis: {
          analyzer: {
            my_analyzer: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'my_filter'],
            },
          },
          filter: {
            my_filter: {
              type: 'stop',
              stopwords: ['the', 'a'],
            },
          },
        },
      },
      mappings: {
        properties: {
          title: { type: 'text', analyzer: 'my_analyzer' },
          content: { type: 'text', analyzer: 'my_analyzer' },
          created_at: { type: 'date' },
        },
      },
    };

    const { body: response } = await this.elasticsearchService.indices.create({
      index,
      body,
    });

    return response;
  }
}

  async search(query: string) {
    const result = await this.elasticsearchService.search({
      index: 'my_index',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'description'],
          },
        },
      },
    });

    return result
  }

  async index(entity: any) {
    await this.elasticsearchService.index({
      index: 'my_index',
      body: entity,
    });
  }

  async remove(entity: any) {
    await this.elasticsearchService.deleteByQuery({
      index: 'my_index',
      body: {
        query: {
          term: {
            _id: entity.id,
          },
        },
      },
    });
  }
}
