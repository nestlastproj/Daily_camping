import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { WeatherModule } from './weather/weather.module';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import * as parser from 'fast-xml-parser';
import { JwtConfigService } from './config/jwt.config.service';
import { JwtModule } from '@nestjs/jwt';
import { ReviewModule } from './review/review.module';
import { RecipeModule } from './recipe/recipe.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from './serch/search.module';
import { SearchConfig } from './config/elastic.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    HttpModule,
    UserModule,
    AuthModule,
    PlaceModule,
    WeatherModule,
    ProductModule,
    ReviewModule,
    RecipeModule,
    ScheduleModule.forRoot(),
    parser.XMLParser,
    ArticleModule,
    CommentModule,
    LikeModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
