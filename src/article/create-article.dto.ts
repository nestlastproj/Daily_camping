import { IsNumber, IsString } from 'class-validator';
// import { IsNotEmpty } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  password: number;
}

// export class CreateArticleDto {
//   @IsNotEmpty()
//   title: string;

//   @IsNotEmpty()
//   content: string;

//   @IsNotEmpty()
//   password: number;
// }
