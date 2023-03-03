import { IsNumber, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  nickname: string;

  @IsString()
  createAT: string;
}
