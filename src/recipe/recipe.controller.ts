import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Cron } from '@nestjs/schedule';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @Cron('* * * 9 * *')
  @Get('recipeget')
  getRecipe() {
    return this.recipeService.getRecipe();
  }
}
