import { Controller, Get, Body, Param } from '@nestjs/common';
import { PlaceApiService } from './place-api.service';
// import { PlaceApiDtoceDto } from './dto/place.dto';

@Controller('placeApi')
export class PlaceApiController {
  constructor(private readonly placeApiService: PlaceApiService) {}
  
  @Get()
  findAll() {
    return this.placeApiService.findAll();
  }
  
  // @Post()
  // create(@Body() placeDto: PlaceApiDto) {
  //   return this.placeService.create(placeDto);
  // }

}
