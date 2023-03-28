import { Controller, Get, Param, Body, Post, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly serchService: SearchService) {}

  @Get('/indexSearch')
  async search(@Query('page') page: number, @Query('keyword') keyword: string) {
    return await this.serchService.getDocument(page, keyword);
  }

  // @Post('/index')
  // async index(@Body() entity: any) {
  //   await this.serchService.index(entity);
  // }

  // @Delete('/remove')
  // async remove(@Body() entity: any) {
  //   await this.serchService.remove(entity);
  // }
}
