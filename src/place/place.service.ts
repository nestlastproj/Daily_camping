import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Place } from '../entity/api/place.entity';
import { ConfigService } from '@nestjs/config';
import { LikeService } from 'src/like/like.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly likeService: LikeService,
  ) {}

  async getPlace(keywords: string[], x: string, y: string) {
    await this.deletePlace();

    const headers = {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_REST_API_KEY')}`,
    };

    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';

    const allPlaces = [];

    for (const keyword of keywords) {
      const params = {
        query: keyword,
        x: x,
        y: y,
        radius: 20000,
        category_group_code: 'AD5',
      };

      const response = await this.httpService.get(url, { params, headers }).toPromise();

      const places = response.data.documents.map((doc) => ({
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
        await this.placeRepository.save(place);
      }

      allPlaces.push(...places);
    }

    return allPlaces;
  }

  async paginate(page) {
    const take = 6;
    const [places, total] = await this.placeRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    const like = await this.likeService.allPlaceLike();
    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      like,
      places,
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
