import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { ProjectCategoryService } from '../project_category/project_category.service';
import { ProjectCategoryRepository } from '../project_category/project_category.repository';
import { ArchitektorService } from '../architektor/architektor.service';
import { ArchitektorRepository } from '../architektor/architektor.repository';
import { ArchitektorEntity } from '../architektor/entities/architektor.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      ArchitektorEntity,
      UserEntity,
    ]),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectRepository,
    ArchitektorService,
    ArchitektorRepository,
    UserService,
    UserRepository,
  ],
})
export class ProjectModule {}
