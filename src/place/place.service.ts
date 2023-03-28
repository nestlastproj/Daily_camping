import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Like, Repository } from 'typeorm';
import { Place } from '../entity/api/place.entity';
import { ConfigService } from '@nestjs/config';
import { Curl } from 'node-libcurl';
import { default as coordinates } from '../resource/coordinates.json';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  //위도y , 경도x
  async getPlace(keywords: string[], x: string, y: string) {
    const headers = {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_REST_API_KEY')}`,
    };
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    const allPlaces = [];

    for (const keyword of keywords) {
      console.log(keyword);
      for (const coordinate of coordinates) {
        console.log(coordinate.city, coordinate.name);
        let params = {
          query: keyword,
          x: coordinate.x,
          y: coordinate.y,
          category_group_code: 'AD5',
          sort: 'distance',
          page: 1,
        };

        const response = await this.httpService.get(url, { params, headers }).toPromise();
        const { pageable_count, total_count } = response.data.meta;
        const maxPage = pageable_count === 45 && total_count > 45 ? 3 : Math.ceil(pageable_count / 15);

        for (let i = 1; i <= maxPage; i++) {
          params.page = i;
          const response = await this.httpService.get(url, { params, headers }).toPromise();

          let places = response.data.documents
            .filter((doc) => {
              return doc.category_name.includes('캠핑장');
            })
            .map((doc) => {
              const citys = doc.address_name.split(' ')[0];
              const detailcitys = doc.address_name.split(' ')[1];

              let city = '';
              let detailname = '';

              if (['부산', '대구', '인천', '광주', '대전', '울산'].includes(citys)) {
                city = citys + '광역시';
                detailname = detailcitys;
              } else if (['경기', '강원'].includes(citys)) {
                city = citys + '도';
                detailname = detailcitys;
              } else if (['충북'].includes(citys)) {
                city = '충청북도';
                detailname = detailcitys;
              } else if (['충남'].includes(citys)) {
                city = '충청남도';
                detailname = detailcitys;
              } else if (['전북'].includes(citys)) {
                city = '전라북도';
                detailname = detailcitys;
              } else if (['전남'].includes(citys)) {
                city = '전라남도';
                detailname = detailcitys;
              } else if (['경북'].includes(citys)) {
                city = '경상북도';
                detailname = detailcitys;
              } else if (['경남'].includes(citys)) {
                city = '경상남도';
                detailname = detailcitys;
              } else if (['제주'].includes(citys)) {
                city = '제주특별자치도';
                detailname = detailcitys;
              } else if (['서울'].includes(citys)) {
                city = '서울특별시';
                detailname = detailcitys;
              } else if (['세종'].includes(citys)) {
                city = '세종특별자치시';
                detailname = detailcitys;
              }

              return {
                address: doc.address_name,
                name: doc.place_name,
                category: doc.category_name,
                phone: doc.phone,
                url: doc.place_url,
                x: doc.x,
                y: doc.y,
                city: city,
                detailcity: detailname,
              };
            });

          for (const place of places) {
            await this.placeRepository
              .createQueryBuilder('place')
              .insert()
              .into('place')
              .values(place)
              .orUpdate(['address', 'phone', 'city', 'detailcity', 'category', 'url', 'x', 'y'], ['name'])
              .updateEntity(false)
              .execute();
          }
          allPlaces.push(...places);
        }
      }
    }
    return allPlaces;
  }

  async placeSearch(page: number, keyword: string) {
    const take = 6;
    const whereQuery = keyword === '' ? '%%' : `%${keyword}%`;
    const [placeList, total] = await this.placeRepository.findAndCount({
      where: [{ name: Like(whereQuery) }, { category: Like(whereQuery) }],
      take,
      skip: (page - 1) * take,
    });

    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      placeList,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  async placeCategorySearch(page: number, cityname: string, detailcity?: string) {
    const take = 6;

    if (detailcity !== '전체') {
      const [placeList, total] = await this.placeRepository.findAndCount({
        where: { detailcity: detailcity, city: cityname },
        take,
        skip: (page - 1) * take,
      });

      const totalPage = Math.ceil(total / take);
      const pageGroup = Math.ceil(page / 5);
      let lastPage = pageGroup * 5;
      const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;
      if (lastPage > totalPage) {
        lastPage = totalPage;
      }

      return {
        placeList,
        meta: {
          firstPage,
          lastPage,
          totalPage,
        },
      };
    }

    const [placeList, total] = await this.placeRepository.findAndCount({
      where: { city: cityname },
      take,
      skip: (page - 1) * take,
    });

    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      placeList,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  async placeDetail(placeId: number) {
    return this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.review', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .where('place.id = :placeId', { placeId })
      .getMany();
  }

  // async placeimage() {
  //   return new Promise((resolve, reject) => {
  //     const curl = new Curl();

  //     curl.setOpt('URL', 'https://place.map.kakao.com/main/v/14061000');
  //     curl.setOpt('FOLLOWLOCATION', true);

  //     curl.on('end', function (statusCode, data, headers) {
  //       const result = JSON.parse(data.toString());
  //       resolve(result);
  //       this.close();
  //     });

  //     curl.on('error', (error) => {
  //       reject(error);
  //       curl.close();
  //     });

  //     curl.perform();
  //   });
  // }
}
