import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCategoryService } from './project_category.service';
import { ProjectCategoryController } from './project_category.controller';

describe('ProjectCategoryController', () => {
  let controller: ProjectCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCategoryController],
      providers: [ProjectCategoryService],
    }).compile();

    controller = module.get<ProjectCategoryController>(
      ProjectCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
