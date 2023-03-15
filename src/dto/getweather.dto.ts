import { PickType } from '@nestjs/mapped-types';
import { WeatherDto } from './weather.dto';

export class GetWeatherDto extends PickType(WeatherDto, [
  'min_temperature',
  'percent',
  'date',
  'weatherstate',
  'type',
  'address',
  'wind',
] as const) {
  'numEf': number
}