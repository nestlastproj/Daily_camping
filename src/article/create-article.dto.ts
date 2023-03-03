import { IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  nickname: string;

  @IsString()
  createAT: string;
}
