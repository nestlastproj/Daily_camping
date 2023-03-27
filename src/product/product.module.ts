import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { SearchConfig } from 'src/config/elastic.config';
import { SearchService } from 'src/serch/search.service';
import { Product } from '../entity/api/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    HttpModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, SearchService],
})
export class ProductModule {}
