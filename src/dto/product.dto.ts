import { IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  price: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  url: string;
}
