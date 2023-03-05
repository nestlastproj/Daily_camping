import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  // 날씨 정보 API에서 자료 받아오기
  getWeather() {
    return this.weatherService.getWeather();
  }
  // DB에 저장된 날씨 정보 조회Y6
  @Get()
  findAllWeather() {
    return this.weatherService.findAllWeather();
  }

  @Post()
  createWeather(@Body() weatherData: WeatherDto) {
    return this.weatherService.createWeather({
      min_temperature: weatherData.min_temperature,
      max_temperature: weatherData.max_temperature,
      percent: weatherData.percent,
      date: weatherData.date,
      weatherstate: weatherData.weatherstate,
      type: weatherData.type,
      address: weatherData.address,
      wind: weatherData.wind,
    });
  }

  @Put()
  updateWeather(@Body() weatherData: WeatherDto) {
    return this.weatherService.createWeather({
      min_temperature: weatherData.min_temperature,
      max_temperature: weatherData.max_temperature,
      percent: weatherData.percent,
      date: weatherData.date,
      weatherstate: weatherData.weatherstate,
      type: weatherData.type,
      address: weatherData.address,
      wind: weatherData.wind,
    });
  }

  // @Delete()
}

