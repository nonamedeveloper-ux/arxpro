import { Module } from '@nestjs/common';
import { HomeTitleService } from './home-title.service';
import { HomeTitleController } from './home-title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeTitleEntity } from './entities/home-title.entity';
import { FileEntity } from '../files/entities/file.entity';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { HomeTitleRepository } from './home-title.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeTitleEntity, FileEntity, UserEntity]),
  ],
  controllers: [HomeTitleController],
  providers: [
    HomeTitleService,
    HomeTitleRepository,
    FileService,
    FileRepository,
    UserService,
    UserRepository,
  ],
})
export class HomeTitleModule {}
