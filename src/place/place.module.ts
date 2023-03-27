import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { SearchConfig } from 'src/config/elastic.config';
import { Like } from 'src/entity/like.entity';
import { LikeModule } from 'src/like/like.module';
import { SearchModule } from 'src/serch/search.module';
import { SearchService } from 'src/serch/search.service';
import { Place } from '../entity/api/place.entity';
import { PlaceController } from '../place/place.controller';
import { PlaceService } from '../place/place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Like]),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    HttpModule,
    LikeModule,
    SearchModule,
  ],
  controllers: [PlaceController],
  providers: [PlaceService, SearchService],
})
export class PlaceModule {}
