import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';

@Injectable()
export class SearchConfig implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.configService.get<string>('ELASTICSEARCH_ID'),
      auth: {
        username: this.configService.get<string>('ELASTICSEARCH_NAME'),
        password: this.configService.get<string>('ELASTICSEARCH_PASSWORD'),
      },
    };
  }
}
