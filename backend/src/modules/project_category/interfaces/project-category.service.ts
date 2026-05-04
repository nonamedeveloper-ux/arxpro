import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';
import { ProjectCategoryEntity } from '../entities/project_category.entity';
import { CreateProjectCategoryDto } from '../dto/create-project_category.dto';
import { UpdateProjectCategoryDto } from '../dto/update-project_category.dto';

export interface IProjectCategoryService {
  findAll(): Promise<ResData<Array<ProjectCategoryEntity>>>;
  findOneById(id: ID): Promise<ResData<ProjectCategoryEntity | undefined>>;
  create(
    dto: CreateProjectCategoryDto,
  ): Promise<ResData<ProjectCategoryEntity>>;
  updated(
    dto: UpdateProjectCategoryDto,
    id: ID,
  ): Promise<ResData<ProjectCategoryEntity>>;
  delete(id: ID): Promise<ResData<ProjectCategoryEntity | undefined>>;
}
