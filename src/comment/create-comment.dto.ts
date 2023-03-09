import { IsNumber, IsString } from 'class-validator';
export class CreateCommentDto {
  title: string;
  content: string;
  articleId: number;
}
