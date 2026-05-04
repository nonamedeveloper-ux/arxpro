import { Module } from '@nestjs/common';
import { FileService } from './files.service';
import { FileController } from './files.controller';
import { FileRepository } from './files.repository';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';
import { ProjectRepository } from '../project/project.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, ProjectEntity, UserEntity])],
  controllers: [FileController],
  providers: [
    FileService,
    FileRepository,
    ProjectService,
    ProjectRepository,
    UserService,
    UserRepository,
  ],
})
export class FileModule {}
