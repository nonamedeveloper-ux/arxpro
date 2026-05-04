import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository {
  findAll(): Promise<Array<ProjectEntity>>;
  findOneById(id: string): Promise<ProjectEntity | undefined>;
  insert(dto: ProjectEntity): Promise<ProjectEntity>;
  update(dto: UpdateProjectDto): Promise<ProjectEntity>;
  delete(id: string): void;
}
