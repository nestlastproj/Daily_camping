import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import * as iconv from 'iconv-lite';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/api/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
  private readonly API_URL = 'https://openapi.11st.co.kr/openapi/OpenApiService.tmall';

  async getProduct(query: string, page: number = 1, pageSize: number = 5000) {
    const params = {
      key: process.env.ELEVENST_API_KEY,
      apiCode: 'ProductSearch',
      keyword: query,
      sortCd: 'CP',
      selMthdCd: '01',
      pageCode: '1',
      pageSize: '5000',
    };

    const response = await axios.get(this.API_URL, { params, responseType: 'arraybuffer' });
    // response 내용물 구조: response.data.ProductSearchResponse.Products[0].Product
    const xmlBuffer = response.data; // 인코딩 형태를 EUC-KR -> UTF-8로 변환하기 위해 담음
    const xmlString = iconv.decode(xmlBuffer, 'EUC-KR'); // 인코딩 형태 변환
    const json = await parseStringPromise(xmlString); // 인코딩 변경된 XML을 JSON형태로 변환
    const products = json.ProductSearchResponse; // 결과물 내 객체에 추가 접근(XML에선 접근불가)

    const productList = products.Products[0].Product.map((product) => {
      return {
        name: product.ProductName[0],
        price: product.ProductPrice[0],
        image: product.ProductImage[0],
        url: product.DetailPageUrl[0],
      };
    });

    const saveProduct = await Promise.all(
      productList.map((product) => {
        return this.productRepository.save(product);
      }),
    );
    return saveProduct;
  }

  findAllProduct() {
    return this.productRepository.find();
  }

  updateProduct(name, price, image, url) {
    const product = { name, price, image, url };
    this.productRepository.save(product);

    return product;
  }
}
