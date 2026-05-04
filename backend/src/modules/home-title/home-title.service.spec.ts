import { Test, TestingModule } from '@nestjs/testing';
import { HomeTitleService } from './home-title.service';

describe('HomeTitleService', () => {
  let service: HomeTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeTitleService],
    }).compile();

    service = module.get<HomeTitleService>(HomeTitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
