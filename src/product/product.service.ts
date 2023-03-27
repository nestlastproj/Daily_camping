import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import * as iconv from 'iconv-lite';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/api/product.entity';
import { Like, Repository } from 'typeorm';
import { SearchService } from 'src/serch/search.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly searchService: SearchService,
  ) {}
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
        image: product.ProductImage300[0],
        url: product.DetailPageUrl[0],
        salePrice: product.SalePrice[0],
      };
    });

    const saveProduct = await Promise.all(
      productList.map((product) => {
        return this.productRepository
          .createQueryBuilder('product')
          .insert()
          .into('product')
          .values(product)
          .orUpdate(['price', 'salePrice', 'name', 'image'], ['url'])
          .updateEntity(false)
          .execute();
      }),
    );

    await this.deleteIndex();
    await this.findindex();

    return saveProduct;
  }

  async findindex() {
    const allfind = await this.productRepository.find();
    allfind.forEach((res) => {
      const keyword = '캠핑용품';
      this.searchService.createDocument(res, keyword);
    });
  }

  async deleteIndex() {
    const keyword = '캠핑용품';
    await this.searchService.deleteDocument(keyword);
  }

  async productSearch(page: number, keyword: string) {
    const take = 6;
    const whereQuery = keyword === '' ? '%%' : `%${keyword}%`;
    const [productList, total] = await this.productRepository.findAndCount({
      where: { name: Like(whereQuery) },
      take,
      skip: (page - 1) * take,
    });

    const totalPage = Math.ceil(total / take);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    const firstPage = lastPage - 5 + 1 <= 0 ? 1 : lastPage - 5 + 1;

    if (lastPage > totalPage) {
      lastPage = totalPage;
    }

    return {
      productList,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }
}
