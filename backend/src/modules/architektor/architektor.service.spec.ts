import { Test, TestingModule } from '@nestjs/testing';
import { ArchitektorService } from './architektor.service';

describe('ArchitektorService', () => {
  let service: ArchitektorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchitektorService],
    }).compile();

    service = module.get<ArchitektorService>(ArchitektorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
