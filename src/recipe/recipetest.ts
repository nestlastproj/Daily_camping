import axios from 'axios';
import cheerio from 'cheerio';
import exp from 'constants';
import { Recipe } from '../entity/api/recipe.entity';
// import { Cron } from '@nestjs/schedule/dist/decorators';
// @Cron('* * * * * *')
async function getRecipe() {
  const recipes = [];
  const getRecipes = async (page) => {
    const html = await axios.get(`https://www.10000recipe.com/recipe/list.html?q=%EC%BA%A0%ED%95%91&order=reco&page=${page}`);
    const $ = cheerio.load(html.data);
    if ($('div.common_sp_caption_tit').length === 0) {
      return;
    }
    $('div.common_sp_caption_tit').each((i, elem) => {
      recipes.push({ title: $(elem).text() });
    });
    $('div.common_sp_thumb').each((i, elem) => {
      const index = (page - 1) * 40 + i;
      recipes[index].link = `https://www.10000recipe.com/${$(elem).find('a').attr('href')}`;
      recipes[index].img = $(elem).find('img').attr('src');
    });
    await getRecipes(page + 1);
  };
  await getRecipes(1);
  console.log(recipes);
}
getRecipe();
