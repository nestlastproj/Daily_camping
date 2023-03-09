import { Test, TestingModule } from '@nestjs/testing';
import { articleController } from './article.controller';

describe('ArticleController', () => {
  let controller: articleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [articleController],
    }).compile();

    controller = module.get<articleController>(articleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
