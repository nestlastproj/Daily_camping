import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entity/api/recipe.entity';
import { Like, Repository } from 'typeorm';
import axios from 'axios';
import cheerio from 'cheerio';
import { empty } from 'cheerio/lib/api/manipulation';
import { SearchService } from 'src/serch/search.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRePository: Repository<Recipe>,
    private readonly searchService: SearchService,
  ) {}

  async getRecipe() {
    const recipes = [];

    const getRecipes = async (page) => {
      const html = await axios.get(`https://www.10000recipe.com/recipe/list.html?q=%EC%BA%A0%ED%95%91&order=reco&page=${page}`);
      const $ = cheerio.load(html.data);

      $('div.common_sp_caption_tit').each((i, elem) => {
        const recipeindex = (page - 1) * 50 + i;

        recipes[recipeindex] = {
          name: $(elem).text(),
          url: '',
          image: '',
          views: '',
        };
      });

      $('span.common_sp_caption_buyer').each((i, elem) => {
        const recipeindex = (page - 1) * 50 + i;

        recipes[recipeindex].views = $(elem).text();
      });

      $('div.common_sp_thumb').each((i, elem) => {
        const index = (page - 1) * 50 + i;

        recipes[index].url = `https://www.10000recipe.com/${$(elem).find('a').attr('href')}`;
        recipes[index].image = $(elem).find('a > img').attr('src');
      });

      if (page < 5) {
        await getRecipes(page + 1);
      }
    };

    await getRecipes(1);

    const cleanrecipes = recipes.filter((empty) => empty !== '<10 empty items>');
    const detailUrl = cleanrecipes.map((response) => {
      return response.url.split('recipe')[2].split('/')[1];
    });

    const contentUrl = detailUrl.map((contentnumber) => `https://www.10000recipe.com/recipe/${contentnumber}`);
    const requestUrls = await Promise.all(contentUrl.map((url) => axios.get(url)));
    const contentData: { content: string[]; image: string[] }[] = [];

    requestUrls.forEach((response) => {
      const $ = cheerio.load(response.data);
      const step = $('div.view_step_cont').children('div.media-body');
      const textArray: string[] = [];

      step.each((index, step) => {
        const text = $(step).text();
        textArray.push(text);
      });

      const imageArray: string[] = [];
      $('div.view_step_cont img').each((i, img) => {
        const image = $(img).attr('src');
        imageArray.push(image);
      });

      contentData.push({ content: textArray, image: imageArray });
    });

    const recipe = recipes.filter((empty) => empty !== '<10 empty items>');

    const entities = recipe.map((recipe, index) => {
      const entity = new Recipe();
      entity.name = recipe.name;
      entity.url = recipe.url;
      entity.image = recipe.image;
      entity.views = recipe.views;
      entity.content = contentData[index].content.join('$');
      entity.contentimage = contentData[index].image.join(',');
      return entity;
    });

    await this.findindex();
    await this.deleteIndex();

    return this.recipeRePository
      .createQueryBuilder('recipe')
      .insert()
      .into('recipe')
      .values(entities)
      .orUpdate(['content', 'image', 'url', 'views', 'contentimage'], ['name'])
      .updateEntity(false)
      .execute();
  }

  async findindex() {
    const allfind = await this.recipeRePository.find();
    allfind.forEach((res) => {
      const keyword = '레시피';
      this.searchService.createDocument(res, keyword);
    });
  }

  async deleteIndex() {
    const keyword = '레시피';
    await this.searchService.deleteDocument(keyword);
  }

  async search(page: number, keyword: string) {
    const recipeSearchData = await this.searchService.getDocument(page, keyword);
    const data = recipeSearchData.map((data) => data._source);
    return data;
  }

  async recipeSearch(page, keyword) {
    const take = 8;
    const whereQuery = keyword === '' ? '%%' : `%${keyword}%`;
    const [recipeList, total] = await this.recipeRePository.findAndCount({
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
      recipeList,
      meta: {
        firstPage,
        lastPage,
        totalPage,
      },
    };
  }

  async recipeDetail(recipeId) {
    return this.recipeRePository.findOne({ where: { id: recipeId } });
  }
}
