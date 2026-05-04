import { UpdateProjectCategoryDto } from '../dto/update-project_category.dto';
import { ProjectCategoryEntity } from '../entities/project_category.entity';

export interface IProjectCategoryRepository {
  findAll(): Promise<Array<ProjectCategoryEntity>>;
  findOneById(id: string): Promise<ProjectCategoryEntity | undefined>;
  insert(dto: ProjectCategoryEntity): Promise<ProjectCategoryEntity>;
  update(dto: UpdateProjectCategoryDto): Promise<ProjectCategoryEntity>;
  delete(id: string): void;
}
