import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { articleModule } from './article/article.module';
import { commentModule } from './comment/comment.module';

@Module({
  imports: [articleModule, commentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
