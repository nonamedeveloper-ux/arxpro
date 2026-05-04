import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorEntity } from './entities/floor.entity';
import { FloorRepository } from './floor.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { ProjectEntity } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { ProjectRepository } from '../project/project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FloorEntity, UserEntity, ProjectEntity])],
  controllers: [FloorController],
  providers: [
    FloorService,
    FloorRepository,
    ProjectService,
    ProjectRepository,
    UserService,
    UserRepository,
  ],
})
export class FloorModule {}
