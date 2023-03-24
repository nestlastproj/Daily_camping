import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { SerchService } from './serch.service';

@Controller()
export class SerchController {
  constructor(private readonly serchService: SerchService) {}

  @Get('/search/:query')
  async search(@Param('query') query: string) {
    return this.serchService.search(query);
  }

  @Post('/index')
  async index(@Body() entity: any) {
    await this.serchService.index(entity);
  }

  @Delete('/remove')
  async remove(@Body() entity: any) {
    await this.serchService.remove(entity);
  }
}
