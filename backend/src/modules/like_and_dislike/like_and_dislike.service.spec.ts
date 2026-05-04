import { Test, TestingModule } from '@nestjs/testing';
import { LikeAndDislikeService } from './like_and_dislike.service';

describe('LikeAndDislikeService', () => {
  let service: LikeAndDislikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeAndDislikeService],
    }).compile();

    service = module.get<LikeAndDislikeService>(LikeAndDislikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
