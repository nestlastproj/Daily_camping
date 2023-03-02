import { IsNumber, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  password: number;
}
