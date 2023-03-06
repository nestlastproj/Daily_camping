import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { map } from 'rxjs/operators';
import { Place } from './entity/api/place.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getPlace(query: string, x: string, y: string) {
    const params = {
      query: query,
      x: x,
      y: y,
      radius: 20000,
      category_group_code: 'AD5',
    };

    const headers = {
      Authorization: `KakaoAK ${this.configService.get('KAKAO_REST_API_KEY')}`,
    };

    const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';

    return this.httpService.get(url, { params, headers }).pipe(
      map((response) =>
        response.data.documents.map((doc) => ({
          address: doc.address_name,
          name: doc.place_name,
          category: doc.category_name,
          phone: doc.phone,
        })),
      ),
    );
  }

  findAllPlace() {
    return this.placeRepository.find();
  }

  createPlace({ name, address, phone, category, url }) {
    const place = { name, address, phone, category, url };
    this.placeRepository.save(place);

    return place;
  }

  updatePlace({ name, address, phone, category, url }) {
    const place = { name, address, phone, category, url };
    this.placeRepository.save(place);

    return place;
  }

  deletePlace() {}
}
