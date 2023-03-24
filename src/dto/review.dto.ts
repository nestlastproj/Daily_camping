import { IsString } from 'class-validator';

export class ReviewDto {
  description?: string;
  @IsString()
  title: string;

  @IsString()
  content: string;
}
