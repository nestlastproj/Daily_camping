import { Controller, Get, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { Cron } from '@nestjs/schedule/dist/decorators';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // @Cron('* * * 9 * *') // 매월 9일마다 api 자동 실행
  @Get('/placeget')
  async getPlace(@Query('keywords') keywords: string[], @Query('x') x: string, @Query('y') y: string) {
    return await this.placeService.getPlace(['글램핑', '캠핑장', '오토 캠핑', '카라반'], x, y);
  }

  @Get('/placeSearch')
  async placeSearch(@Query('page') page: number, @Query('keyword') keyword: string) {
    return await this.placeService.placeSearch(page, keyword);
  }

  @Get('/placeCategorySearch')
  async placeCategorySearch(
    @Query('page') page: number,
    @Query('cityname') cityname: string,
    @Query('detailcity') detailcity?: string,
  ) {
    return this.placeService.placeCategorySearch(page, cityname, detailcity);
  }

  @Get('/placeDetail')
  async placeDetail(@Query('placeId') placeId: number) {
    return await this.placeService.placeDetail(placeId);
  }
}
