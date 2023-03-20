import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { join } from 'path';
import * as ejs from 'ejs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.engine('ejs', ejs.renderFile);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
