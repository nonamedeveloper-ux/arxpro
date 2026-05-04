import { InjectRepository } from '@nestjs/typeorm';
import { IProjectCategoryRepository } from './interfaces/project-category.repository';
import { ProjectCategoryEntity } from './entities/project_category.entity';
import { Repository } from 'typeorm';
import { UpdateProjectCategoryDto } from './dto/update-project_category.dto';
import { ID } from 'src/common/types/Id.type';
export class ProjectCategoryRepository implements IProjectCategoryRepository {
  constructor(
    @InjectRepository(ProjectCategoryEntity)
    private repository: Repository<ProjectCategoryEntity>,
  ) {}
  async findAll(): Promise<Array<ProjectCategoryEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<ProjectCategoryEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: ProjectCategoryEntity): Promise<ProjectCategoryEntity> {
    const newProjectCategory = this.repository.create(entity);

    await this.repository.save(newProjectCategory);

    return newProjectCategory;
  }

  async update(dto: UpdateProjectCategoryDto): Promise<ProjectCategoryEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
