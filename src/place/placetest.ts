import { HttpService } from '@nestjs/axios';
import { JSDOM } from 'jsdom';

async function crawlAddress() {
  const httpService = new HttpService();

  const response = await httpService.get('https://place.map.kakao.com/14061000');

  console.log(response);
  const dom = new JSDOM(response.data);
  const addressElement = dom.window.document.querySelector('.addr');

  if (addressElement) {
    const address = addressElement.textContent.trim();
    console.log('Address:', address);
    return address;
  } else {
    console.log('Address not found');
    return null;
  }
}

crawlAddress();
