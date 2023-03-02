import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { articleModule } from './article/article.module';

@Module({
  imports: [articleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
