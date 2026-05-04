import { Module } from '@nestjs/common';
import { ProjectCategoryService } from './project_category.service';
import { ProjectCategoryController } from './project_category.controller';
import { ProjectCategoryRepository } from './project_category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCategoryEntity } from './entities/project_category.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectCategoryEntity, UserEntity])],
  controllers: [ProjectCategoryController],
  providers: [
    ProjectCategoryService,
    ProjectCategoryRepository,
    UserService,
    UserRepository,
  ],
})
export class ProjectCategoryModule {}
