import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly serchService: SearchService) {}

  @Get('/indexSearch')
  async search(@Query('keyword') keyword: string) {
    return await this.serchService.getDocument(keyword);
  }
}
