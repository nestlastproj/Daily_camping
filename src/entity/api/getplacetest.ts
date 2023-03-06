// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class PlaceService {
//   constructor(private readonly httpService: HttpService) {}

//   async getPlace(query: string) {
//     const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURI(query)}&display=100`;

//     const headers = {
//       'X-Naver-Client-Id': `${process.env.NAVER_CLIENT_ID}`,
//       'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`,
//     };

//     const response = await this.httpService
//       .get(url, { headers })
//       .pipe(map((res) => res.data))
//       .toPromise();

//     return response.items;
//   }
// }

// getPlace('캠핑장');
