import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { User } from '../entity/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/util/upload.multer';
import { Article } from 'src/entity/article.entity';
import { Comment } from 'src/entity/comment.entity';
import { ArticleModule } from 'src/article/article.module';
import { CommentModule } from 'src/comment/comment.module';
import { Review } from 'src/entity/review.entity';
import { ReviewModule } from 'src/review/review.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Article, Comment, Review]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    ReviewModule,
    PassportModule,
    MulterModule.registerAsync({ useFactory: multerOptionsFactory }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
