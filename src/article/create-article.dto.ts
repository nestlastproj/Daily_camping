import { IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  title: string;
  content: string;
  createdAt: string;
}
