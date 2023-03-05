import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
// import { PlaceDto } from './dto/place.dto';
import { Place } from './entity/api/place.entity';

@Injectable()
export class PlaceService {
  constructor(@InjectRepository(Place) private placeRepository: Repository<Place>) {}
  private place: Array<Place> = [];

  findAllPlace() {
    return this.placeRepository.find();
  }

  createPlace({ price, name, address, content, phone, category, image }) {
    const place = { price, name, address, content, phone, category, image };
    this.placeRepository.save(place);

    return this.place;
  }

  updatePlace({ price, name, address, content, phone, category, image }) {
    const place = { price, name, address, content, phone, category, image };
    this.placeRepository.save(place);

    return this.place;
  }

  deletePlace() {}
}
