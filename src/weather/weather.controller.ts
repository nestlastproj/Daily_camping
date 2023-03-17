import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Cron } from '@nestjs/schedule';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // @Cron('* * * 9 * *') // 매월 9일마다 api 자동 실행
  @Get('/weatherget')
  // 날씨 정보 API에서 자료 받아오기
  getWeather() {
    return this.weatherService.getWeather();
  }
  // DB에 저장된 날씨 정보 조회
  @Get()
  findAllWeather() {
    return this.weatherService.findAllWeather();
  }
}
