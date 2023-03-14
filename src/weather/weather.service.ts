import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Weather } from '../entity/api/weather.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather) private readonly weatherRepository: Repository<Weather>,
    private readonly configService: ConfigService,
  ) {}

  async getWeather() {
    await this.deleteWeather();

    const regionlds = [
      '11D10301', //'춘천'
      '11B10101', //'서울'
      '11D20501', //'강릉'
      '11A00101', //'백령도,'
      '11C10301', //'청주'
      '11E00101', //'울릉도,독도'
      '11B20601', //'수원'
      '11H10501', //'안동'
      '11C20401', //'대전'
      '11F10201', //'전주'
      '11H10701', //'대구'
      '11H20101', //'울산'
      '11B20702', //'광주'
      '21F20801', //'목포'
      '11F20401', //'여수'
      '11H20201', //'부산'
      '11G00201', //'제주'
    ];

    const time = new Date();
    const year = time.getFullYear(); // 년도
    const month = time.getMonth() + 1; // 월
    const day = time.getDate(); //일

    let nowTime = year + '-' + month + '-' + day;

    if (month < 10 && day < 10) {
      nowTime = year.toString() + '0' + month.toString() + '0' + day.toString();
    } else if (10 <= month && day < 10) {
      nowTime = year.toString() + month.toString() + '0' + day.toString();
    } else if (month < 10 && 10 <= day) {
      nowTime = year.toString() + '0' + month.toString() + day.toString();
    } else if (10 < month && 10 < day) {
      nowTime = year.toString() + month.toString() + day.toString();
    }

    const requestUrls = regionlds.map(
      (regionId) =>
        `https://apis.data.go.kr/1360000/VilageFcstMsgService/getLandFcst?serviceKey=${this.configService.get(
          'WEATHER_API_KEY',
        )}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${nowTime}&regId=${regionId}`,
    );

    const responses = await Promise.all(requestUrls.map((url) => axios.get(url)));
    // 한번에 오늘 -3일 +3일 날씨 데이터 전체

    const addressName = {
      '11D10301': '춘천',
      '11B10101': '서울',
      '11D20501': '강릉',
      '11A00101': '백령도',
      '11C10301': '청주',
      '11E00101': '울릉도,독도',
      '11B20601': '수원',
      '11H10501': '안동',
      '11C20401': '대전',
      '11F10201': '전주',
      '11H10701': '대구',
      '11H20101': '울산',
      '11B20702': '광주',
      '21F20801': '목포',
      '11F20401': '여수',
      '11H20201': '부산',
      '11G00201': '제주',
    };

    const weatherList = responses.flatMap((response) =>
      response.data.response.body.items.item.map((item) => ({
        numEf: item.numEf, // 발표시간기준 발효번호
        min_temperature: item.ta, //온도
        percent: item.rnSt, //강수 확률
        date: item.announceTime, //발표 날짜
        weatherstate: item.wf, //날씨
        type: item.rnYn, // 강수형태 (ex. 강수없음/비/눈/소나기)
        address: addressName[item.regId] || item.regId, //예보 지역
        wind: item.wsIt, //풍속
      })),
    );

    // 오늘 현재 시간 날씨
    const nowWeatherList = weatherList.filter((item) => item.numEf === 0);

    let nowWeather = nowWeatherList.map((responses) => ({
      min_temperatur: responses.min_temperature,
      percent: responses.percent,
      date: responses.date,
      weatherstate: responses.weatherstate,
      type: responses.type,
      address: responses.address,
      wind: responses.wind,
    }));

    nowWeather.map((weather) => {
      return this.weatherRepository.save(weather);
    });

    return nowWeather;
  }

  async deleteWeather() {
    await this.weatherRepository.delete({});
  }

  findAllWeather() {
    return this.weatherRepository.find();
  }
}
