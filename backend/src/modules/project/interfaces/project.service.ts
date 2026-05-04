import { ResData } from 'src/lib/resData';
import { ProjectEntity } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ID } from 'src/common/types/Id.type';

export interface IProjectService {
  findAll(): Promise<ResData<Array<ProjectEntity>>>;
  findOneById(id: ID): Promise<ResData<ProjectEntity | undefined>>;
  create(dto: CreateProjectDto): Promise<ResData<ProjectEntity>>;
  updated(dto: UpdateProjectDto, id: ID): Promise<ResData<ProjectEntity>>;
  delete(id: ID): Promise<ResData<ProjectEntity | undefined>>;
}
