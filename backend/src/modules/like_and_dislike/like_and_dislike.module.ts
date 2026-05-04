import { Module } from '@nestjs/common';
import { LikeAndDislikeService } from './like_and_dislike.service';
import { LikeAndDislikeController } from './like_and_dislike.controller';
import { LikeAndDislikeRepository } from './like_and_dislike.repository';
import { ArchitektorService } from '../architektor/architektor.service';
import { ArchitektorRepository } from '../architektor/architektor.repository';
import { ProjectRepository } from '../project/project.repository';
import { ProjectService } from '../project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeAndDislikeEntity } from './entities/like_and_dislike.entity';
import { ArchitektorEntity } from '../architektor/entities/architektor.entity';
import { ProjectEntity } from '../project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeAndDislikeEntity,
      ArchitektorEntity,
      ProjectEntity,
    ]),
  ],
  controllers: [LikeAndDislikeController],
  providers: [
    LikeAndDislikeService,
    LikeAndDislikeRepository,
    ArchitektorService,
    ArchitektorRepository,
    ProjectService,
    ProjectRepository,
  ],
})
export class LikeAndDislikeModule {}
