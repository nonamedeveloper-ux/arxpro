import { Test, TestingModule } from '@nestjs/testing';
import { LikeAndDislikeController } from './like_and_dislike.controller';
import { LikeAndDislikeService } from './like_and_dislike.service';

describe('LikeAndDislikeController', () => {
  let controller: LikeAndDislikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeAndDislikeController],
      providers: [LikeAndDislikeService],
    }).compile();

    controller = module.get<LikeAndDislikeController>(LikeAndDislikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
