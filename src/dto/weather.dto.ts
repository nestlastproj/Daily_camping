import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeatherDto {
  description?: number;
  @IsString()
  min_temperature: string;

  @IsString()
  max_temperature: string;

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

  @IsString()
  wind: string;
}
