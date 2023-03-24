import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Cron } from '@nestjs/schedule/dist/decorators';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Cron('* * * 9 * *') // 매월 9일마다 api 자동 실행
  @Get('/productget')
  async getProduct(@Query('query') query: string) {
    const product = await this.productService.getProduct('캠핑용품');
    return { product };
  }

  @Get('/productSearch')
  async productSearch(@Query('page') page: number, @Query('keyword') keyword: string) {
    return await this.productService.productSearch(page, keyword);
  }
}
