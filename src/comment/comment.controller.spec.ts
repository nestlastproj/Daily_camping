import { Test, TestingModule } from '@nestjs/testing';
import { commentController } from './comment.controller';

describe('CommentController', () => {
  let controller: commentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [commentController],
    }).compile();

    controller = module.get<commentController>(commentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
