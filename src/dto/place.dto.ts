import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlaceDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  phone: number;

  @IsNumber()
  category: number;

  @IsString()
  url: string;
}
