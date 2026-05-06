import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { FilterProjectDto } from '../dto/filter-project.dto';

export interface IProjectRepository {
  findAll(filter?: FilterProjectDto): Promise<Array<ProjectEntity>>;
  findOneById(id: string): Promise<ProjectEntity | undefined>;
  insert(dto: ProjectEntity): Promise<ProjectEntity>;
  update(dto: UpdateProjectDto): Promise<ProjectEntity>;
  delete(id: string): void;
}
