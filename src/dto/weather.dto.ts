import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeatherDto {
  @IsNumber()
  min_temperature: number;

  @IsNumber()
  max_temperature: number;

  @IsNumber()
  percent: number;

  @IsString()
  date: string;

  @IsString()
  weatherstate: string;

  @IsNumber()
  type: number;

  @IsString()
  address: string;

  @IsNumber()
  wind: number;
}
