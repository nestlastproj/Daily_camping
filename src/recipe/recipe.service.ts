import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entity/api/recipe.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRePository: Repository<Recipe>) {}

  async getRecipe() {
    const recipes = [];

    const getRecipes = async (page) => {
      const html = await axios.get(`https://www.10000recipe.com/recipe/list.html?q=%EC%BA%A0%ED%95%91&order=reco&page=${page}`);
      const $ = cheerio.load(html.data);

      if ($('div.common_sp_caption_tit').length === 0) {
        return;
      }

      $('div.common_sp_caption_tit').each((i, elem) => {
        const recipeindex = (page - 1) * 40 + i;

        recipes[recipeindex] = {
          name: $(elem).text(),
          url: '',
          image: '',
          views: '',
        };
      });

      $('span.common_sp_caption_buyer').each((i, elem) => {
        const recipeindex = (page - 1) * 40 + i;

        recipes[recipeindex].views = $(elem).text();
      });

      $('div.common_sp_thumb').each((i, elem) => {
        const index = (page - 1) * 40 + i;

        recipes[index].url = `https://www.10000recipe.com/${$(elem).find('a').attr('href')}`;
        recipes[index].image = $(elem).find('img').attr('src');
      });

      if ($('a.next').length > 0) {
        await getRecipes(page + 1);
      }
    };

    await getRecipes(1);

    const detailUrl = recipes.map((response) => {
      return response.url.split('recipe')[2].split('/')[1];
    });

    const contentUrl = detailUrl.map((contentnumber) => `https://www.10000recipe.com//recipe/${contentnumber}`);
    const requestUrls = await Promise.all(contentUrl.map((url) => axios.get(url)));

    const mediaBodyTextArray: string[][] = [];

    requestUrls.forEach((response) => {
      const $ = cheerio.load(response.data);
      const step = $('div.view_step_cont').children('div.media-body');
      const textArray: string[] = [];
      step.each((index, step) => {
        const text = $(step).text();
        textArray.push(text);
      });
      mediaBodyTextArray.push(textArray);
    });

    const entities = recipes.map((recipe, index) => {
      const entity = new Recipe();
      entity.name = recipe.name;
      entity.url = recipe.url;
      entity.image = recipe.image;
      entity.views = recipe.views;
      entity.content = mediaBodyTextArray[index].join('\n');
      return entity;
    });

    console.log(entities);

    return this.recipeRePository.save(entities);
  }
}
