import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Like, Repository } from 'typeorm';
import { Place } from '../entity/api/place.entity';
import { ConfigService } from '@nestjs/config';
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
    // await this.deletePlace();

    const headers = {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_REST_API_KEY')}`,
    };
    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    const allPlaces = [];

    for (const keyword of keywords) {
      console.log(keyword)
      for (const coordinate of coordinates) {
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
            .map((doc) => ({
              address: doc.address_name,
              name: doc.place_name,
              category: doc.category_name,
              phone: doc.phone,
              url: doc.place_url,
              keyword: keyword,
              x: doc.x,
              y: doc.y,
            }));

          for (const place of places) {
            await this.placeRepository
              .createQueryBuilder('place')
              .insert()
              .into('place')
              .values(place)
              .orUpdate(['address', 'phone', 'category', 'url', 'x', 'y'], ['name'])
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

  async deletePlace() {
    await this.placeRepository.delete({});
  }
}
