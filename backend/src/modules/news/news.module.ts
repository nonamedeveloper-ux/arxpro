import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { FileEntity } from '../files/entities/file.entity';
import { NewsRepository } from './news.repository';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity, FileEntity, UserEntity])],
  controllers: [NewsController],
  providers: [
    NewsService,
    NewsRepository,
    FileService,
    FileRepository,
    UserService,
    UserRepository,
  ],
})
export class NewsModule {}
