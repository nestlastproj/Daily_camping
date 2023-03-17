import axios from 'axios';
import { GetWeatherDto } from 'src/dto/getweather.dto';

async function getWeather(): Promise<void> {
  const regionlds = [
    '11D10301',
    '11B10101',
    '11D20501',
    '11A00101',
    '11C10301',
    '11E00101',
    '11B20601',
    '11H10501',
    '11C20401',
    '11F10201',
    '11H10701',
    '11H20101',
    '11B20702',
    '21F20801',
    '11F20401',
    '11H20201',
    '11G00201',
  ];

  const requestUrls = regionlds.map(
    (regionId) =>
      `https://apis.data.go.kr/1360000/VilageFcstMsgService/getLandFcst?serviceKey=BthofBFYTajyPVPAgO6f3jtw%2Fp%2FaWEmOsQ9lvs3dfAPnuIbvZfKA2M%2BEQqmrpSGOuasE1sTj34ccAgjECEEI5A%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&regId=${regionId}`,
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
  const nowWeatherList: GetWeatherDto[] = weatherList.filter((item) => item.numEf === 0)

  console.log(nowWeatherList);
}

getWeather();