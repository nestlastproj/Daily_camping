import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { GetWeatherDto } from './dto/getweather.dto';
import { Weather } from './entity/api/weather.entity';
import axios from 'axios';

@Injectable()
export class WeatherService {
  constructor(@InjectRepository(Weather) private weatherRepository: Repository<Weather>) {}

  async getWeather(): Promise<GetWeatherDto[]> {
    const regionlds = [
      '11D10301', // 춘천
      '11B10101', // 서울
      '11D20501', // 강릉
      '11A00101', // 백령도
      '11C10301', // 청주
      '11E00101', // 울릉도,독도
      '11B20601', // 수원
      '11H10501', // 안동
      '11C20401', // 대전
      '11F10201', // 전주
      '11H10701', // 대구
      '11H20101', // 울산
      '11B20702', // 광주
      '21F20801', // 목포
      '11F20401', // 여수
      '11H20201', // 부산
      '11G00201', // 제주
    ];

    const requestUrls = regionlds.map(
      (regionId) =>
        `https://apis.data.go.kr/1360000/VilageFcstMsgService/getLandFcst?serviceKey=${process.env.KMA_WEATHER_API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&regId=${regionId}`,
    );

    const responses = await Promise.all(requestUrls.map((url) => axios.get(url)));

    // 한번에 오늘 -3일 +3일 날씨 데이터 전체
    const weatherList: GetWeatherDto[] = responses.flatMap((response) =>
      response.data.response.body.items.item.map((item) => ({
        numEf: item.numEf, // 발표시간기준 발효번호
        min_temperature: item.ta, //온도
        percent: item.rnSt, //강수 확률
        date: new Date(item.announceTime), //발표 날짜
        weatherstate: item.wf, //날씨
        type: item.rnYn, // 강수형태 (ex. 강수없음/비/눈/소나기)
        address: item.regId, //예보 지역
        wind: item.wsIt, //풍속
      })),
    );

    // 오늘 현재 시간 날씨
    const nowWeatherList: GetWeatherDto[] = weatherList.filter((item) => item.numEf === 0);

    console.log(nowWeatherList);

    return nowWeatherList;
  }

  findAllWeather() {
    return this.weatherRepository.find();
  }

  createWeather({ min_temperature, max_temperature, percent, date, weatherstate, type, address, wind }) {
    const weather = { min_temperature, max_temperature, percent, date, weatherstate, type, address, wind };
    this.weatherRepository.save(weather);

    return this.createWeather;
  }

  updateWeather({ min_temperature, max_temperature, percent, date, weatherstate, type, address, wind }) {
    const weather = { min_temperature, max_temperature, percent, date, weatherstate, type, address, wind };
    this.weatherRepository.save(weather);

    return this.updateWeather;
  }
}
