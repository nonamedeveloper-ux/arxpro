import { Test, TestingModule } from '@nestjs/testing';
import { HomeTitleController } from './home-title.controller';
import { HomeTitleService } from './home-title.service';

describe('HomeTitleController', () => {
  let controller: HomeTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeTitleController],
      providers: [HomeTitleService],
    }).compile();

    controller = module.get<HomeTitleController>(HomeTitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
