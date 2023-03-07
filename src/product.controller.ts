import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('productget')
  async getProduct(@Query('query') query: string, productDto: ProductDto) {
    const product = await this.productService.getProduct('캠핑용품');
    return { product };
  }

  @Post()
  createProduct(@Body() productData: ProductDto) {
    return this.productService.createProduct(productData.name, productData.price, productData.image, productData.url);
  }

  @Put()
  updateProduct(@Body() productData: ProductDto) {
    return this.productService.updateProduct(productData.name, productData.price, productData.image, productData.url);
  }
}
