import { Injectable } from '@nestjs/common';
import { CreateProjectCategoryDto } from './dto/create-project_category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project_category.dto';
import { ResData } from 'src/lib/resData';
import { ProjectCategoryEntity } from './entities/project_category.entity';
import { ProjectCategoryNotFoundException } from './exception/project-category.exception';
import { ID } from 'src/common/types/Id.type';
import { IProjectCategoryService } from './interfaces/project-category.service';
import { ProjectCategoryRepository } from './project_category.repository';

@Injectable()
export class ProjectCategoryService implements IProjectCategoryService {
  constructor(private readonly repository: ProjectCategoryRepository) {}

  async findAll(): Promise<ResData<ProjectCategoryEntity[]>> {
    const ProjectCategorys = await this.repository.findAll();

    return new ResData<Array<ProjectCategoryEntity>>(
      'get all project categorys',
      200,
      ProjectCategorys,
    );
  }

  async findOneById(id: ID): Promise<ResData<ProjectCategoryEntity>> {
    const foundProjectCategory = await this.repository.findOneById(id);

    if (!foundProjectCategory) {
      throw new ProjectCategoryNotFoundException();
    }

    return new ResData<ProjectCategoryEntity>(
      'get by id ProjectCategory',
      200,
      foundProjectCategory,
    );
  }

  async create(
    dto: CreateProjectCategoryDto,
  ): Promise<ResData<ProjectCategoryEntity>> {
    const newData = new ProjectCategoryEntity();

    Object.assign(newData, dto);

    const createData = await this.repository.insert(newData);

    return new ResData<ProjectCategoryEntity>('created', 201, createData);
  }

  async updated(
    dto: UpdateProjectCategoryDto,
    id: ID,
  ): Promise<ResData<ProjectCategoryEntity>> {
    const foundProjectCategory = await this.repository.findOneById(id);

    if (!foundProjectCategory) {
      throw new ProjectCategoryNotFoundException();
    }

    const newProjectCategory = Object.assign(foundProjectCategory, dto);

    const updateData = await this.repository.update(newProjectCategory);

    return new ResData<ProjectCategoryEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<ProjectCategoryEntity>> {
    const foundProjectCategory = await this.repository.findOneById(id);

    if (!foundProjectCategory) {
      throw new ProjectCategoryNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<ProjectCategoryEntity>(
      'deleted',
      200,
      foundProjectCategory,
    );
  }
}
