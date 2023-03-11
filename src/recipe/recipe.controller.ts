import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @Cron('* * * 9 * *')
  @Get('/')
  getRecipe() {
    return this.recipeService.getRecipe();
  }
}
