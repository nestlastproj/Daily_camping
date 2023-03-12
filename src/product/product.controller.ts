import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { Cron } from '@nestjs/schedule/dist/decorators';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Cron('* * * 9 * *') // 매월 9일마다 api 자동 실행
  @Get('productget')
  async getProduct(@Query('query') query: string, productDto: ProductDto) {
    const product = await this.productService.getProduct('캠핑용품');
    return { product };
  }

  @Put()
  updateProduct(@Body() productData: ProductDto) {
    return this.productService.updateProduct(productData.name, productData.price, productData.image, productData.url);
  }
}
