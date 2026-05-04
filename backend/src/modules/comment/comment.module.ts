import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CommentRepository } from './comment.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';
import { FileEntity } from '../files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, FileEntity])],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    UserService,
    UserRepository,
    FileService,
    FileRepository,
  ],
})
export class CommentModule {}
