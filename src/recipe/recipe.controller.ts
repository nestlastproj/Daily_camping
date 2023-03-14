import { Controller, Get, Query, Render } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Cron } from '@nestjs/schedule';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @Cron('* * * 9 * *')
  @Get('/recipeget')
  getRecipe() {
    return this.recipeService.getRecipe();
  }

  @Get('/recipe')
  async findAllRecipe(@Query('page') page: number = 1) {
    return this.recipeService.paginate(page);
  }

  @Get('/recipeList')
  @Render('recipe')
  recipeList() {}
}
