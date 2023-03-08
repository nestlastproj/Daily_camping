import { Test, TestingModule } from '@nestjs/testing';
import { commentService } from './comment.service';

describe('CommentService', () => {
  let service: commentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [commentService],
    }).compile();

    service = module.get<commentService>(commentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
