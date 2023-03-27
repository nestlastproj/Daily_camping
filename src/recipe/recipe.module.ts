import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchConfig } from 'src/config/elastic.config';
import { Recipe } from 'src/entity/api/recipe.entity';
import { SearchService } from 'src/serch/search.service';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, SearchService],
})
export class RecipeModule {}
