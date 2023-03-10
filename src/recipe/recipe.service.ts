import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/entity/api/recipe.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import cheerio from 'cheerio';
import exp from 'constants';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private readonly recipeRePository: Repository<Recipe>) {}

  async getRecipe() {
    const url = 'https://www.10000recipe.com/recipe/list.html?q=%EC%BA%A0%ED%95%91%EC%9A%94%EB%A6%AC';

    const response = await axios.get(url);

    console.log(response.data)

    return response;
  }
}
