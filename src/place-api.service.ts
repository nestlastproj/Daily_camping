import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
// import { PlaceDto } from './dto/place.dto';
import { Place } from './entity/api/place.entity';

@Injectable()
export class PlaceApiService {
  constructor(@InjectRepository(Place) private placeRepository: Repository<Place>) {}
  private place: Array<Place> = [];
  // private id = 0;

  findAll() {
    return [...this.place];
  }

  // create(createPlaceDto: PlaceDto) {
  //   this.place.push({ id: ++this.id, ...createPlaceDto, createdAt: new Date() });
  // }
}
