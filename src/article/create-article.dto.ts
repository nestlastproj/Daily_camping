import { IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  title: string;
  content: string;
  nickname: string;
  createAT: string;
}
