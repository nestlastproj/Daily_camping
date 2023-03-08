import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm/dist';
import { Place } from 'src/entity/api/place.entity';
import { Product } from 'src/entity/api/product.entity';
import { Recipe } from 'src/entity/api/recipe.entity';
import { Weather } from 'src/entity/api/weather.entity';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { Like } from 'src/entity/like.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User, Article, Comment, Like, Product, Place, Recipe, Weather],
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    };
  }
}
