import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import { ResData } from 'src/lib/resData';
import { ProjectEntity } from './entities/project.entity';
import { ID } from 'src/common/types/Id.type';
import { ProjectNotFoundException } from './exception/project.exception';
import { IProjectService } from './interfaces/project.service';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  async findAll(filter?: FilterProjectDto): Promise<ResData<ProjectEntity[]>> {
    const Projects = await this.repository.findAll(filter);

    return new ResData<Array<ProjectEntity>>('get all projects', 200, Projects);
  }

  async findOneById(id: ID): Promise<ResData<ProjectEntity>> {
    const foundProject = await this.repository.findOneById(id);

    if (!foundProject) {
      throw new ProjectNotFoundException();
    }

    const findData = await this.repository.findId(id)


    const viewsCount = findData.viewsCount;

    const dto = { viewsCount: viewsCount + 1, IsTop: false };

    const newData = Object.assign(findData, dto);

    await this.updated(newData, foundProject.id)

    return new ResData<ProjectEntity>('get by id project', 200, foundProject);
  }

  async create(dto: CreateProjectDto): Promise<ResData<ProjectEntity>> {
    const newData = new ProjectEntity();

    const maxSon = await this.repository.findMaxNumber();

    if (maxSon) {
      newData.name = maxSon + 1;
    } else {
      newData.name = 1;
    }

    Object.assign(newData, dto);

    const createData = await this.repository.insert(newData);

    return new ResData<ProjectEntity>('created', 201, createData);
  }

  async updated(
    dto: UpdateProjectDto,
    id: ID,
  ): Promise<ResData<ProjectEntity>> {
    const foundProject = await this.repository.findId(id);

    if (!foundProject) {
      throw new ProjectNotFoundException();
    }

    const newProject = Object.assign(foundProject, dto);

    const updateData = await this.repository.update(newProject);

    return new ResData<ProjectEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<ProjectEntity>> {
    const foundProject = await this.repository.findOneById(id);

    if (!foundProject) {
      throw new ProjectNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<ProjectEntity>('deleted', 200, foundProject);
  }
}
