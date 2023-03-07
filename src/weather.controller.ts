import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dto/weather.dto';
import { GetWeatherDto } from './dto/getweather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weatherget')
  // 날씨 정보 API에서 자료 받아오기
  getWeather(getWeatherDto: GetWeatherDto) {
    return this.weatherService.getWeather();
  }
  // DB에 저장된 날씨 정보 조회
  @Get()
  findAllWeather(getWeatherDto: GetWeatherDto) {
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

