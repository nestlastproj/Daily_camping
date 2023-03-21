import { Controller, Get, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Cron } from '@nestjs/schedule';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @Cron('* * * 9 * *')
  @Get('/recipeget')
  async getRecipe() {
    return await this.recipeService.getRecipe();
  }

  @Get('/recipeSearch')
  async recipeSearch(@Query('page') page: number, @Query('keyword') keyword: string) {
    return await this.recipeService.recipeSearch(page, keyword);
  }

  @Get('/recipeDetail')
  async recipeDetail(@Query('recipeId') recipeId: number) {
    return await this.recipeService.recipeDetail(recipeId);
  }
}
