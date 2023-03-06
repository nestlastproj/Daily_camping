import { Controller, Get, Body, Param, Delete, Post, Put, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceDto } from './dto/place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/placeget')
  async getPlace(@Query('query') query: string, @Query('x') x: string, @Query('y') y: string) {
    return this.placeService.getPlace('캠핑장', '0', '0');
  }

  @Get('place')
  findAllPlace() {
    return this.placeService.findAllPlace();
  }

  @Post()
  createPlace(@Body() placeData: PlaceDto) {
    return this.placeService.createPlace({
      name: placeData.name,
      address: placeData.address,
      phone: placeData.phone,
      category: placeData.category,
      url: placeData.url,
    });
  }

  @Put()
  updatePlace(@Body() placeData: PlaceDto) {
    return this.placeService.updatePlace({
      name: placeData.name,
      address: placeData.address,
      phone: placeData.phone,
      category: placeData.category,
      url: placeData.url,
    });
  }

  // @Delete()
  // deletePlace() {
  //   return this.placeService.deletePlace(PlaceDto);
  // }
}
