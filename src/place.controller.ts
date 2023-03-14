import { Controller, Get, Body, Put, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceDto } from './dto/place.dto';
import { Cron } from '@nestjs/schedule/dist/decorators';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Cron('* * * 9 * *') // 매월 9일마다 api 자동 실행
  @Get('/placeget')
  async getPlace(@Query('query') query: string, @Query('x') x: string, @Query('y') y: string) {
    return this.placeService.getPlace('캠핑장', '0', '0');
  }

  @Get('place')
  findAllPlace() {
    return this.placeService.findAllPlace();
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
