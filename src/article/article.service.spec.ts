import { Test, TestingModule } from '@nestjs/testing';
import { articleService } from './article.service';

describe('ArticleService', () => {
  let service: articleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [articleService],
    }).compile();

    service = module.get<articleService>(articleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
