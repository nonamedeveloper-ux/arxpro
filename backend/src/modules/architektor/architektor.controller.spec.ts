import { Test, TestingModule } from '@nestjs/testing';
import { ArchitektorController } from './architektor.controller';
import { ArchitektorService } from './architektor.service';

describe('ArchitektorController', () => {
  let controller: ArchitektorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchitektorController],
      providers: [ArchitektorService],
    }).compile();

    controller = module.get<ArchitektorController>(ArchitektorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
