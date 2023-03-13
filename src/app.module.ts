import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place.module';
import { WeatherModule } from './weather.module';
import { ProductModule } from './product.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import * as parser from 'fast-xml-parser';
import { JwtConfigService } from './config/jwt.config.service';
import { JwtModule } from '@nestjs/jwt';
// import { ChatModule } from './chat/chat.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
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
    UserModule,
    AuthModule,
    PlaceModule,
    WeatherModule,
    ProductModule,
    ScheduleModule.forRoot(),
    parser.XMLParser,
    // ChatModule,
    ArticleModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
