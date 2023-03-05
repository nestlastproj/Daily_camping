import { Controller, Get, Body, Param, Delete, Post, Put } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceDto } from './dto/place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('place')
  findAllPlace() {
    return this.placeService.findAllPlace();
  }

  @Post()
  createPlace(@Body() placeData: PlaceDto) {
    return this.placeService.createPlace({
      price: placeData.price,
      name: placeData.name,
      address: placeData.address,
      content: placeData.content,
      phone: placeData.phone,
      category: placeData.category,
      image: placeData.image,
    });
  }

  @Put()
  updatePlace(@Body() placeData: PlaceDto) {
    return this.placeService.updatePlace({
      price: placeData.price,
      name: placeData.name,
      address: placeData.address,
      content: placeData.content,
      phone: placeData.phone,
      category: placeData.category,
      image: placeData.image,
    });
  }

  @Delete()
  deletePlace() {
    return this.placeService.deletePlace(PlaceDto);
  }
}
