import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { FileEntity } from '../files/entities/file.entity';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, FileService, FileRepository],
})
export class UserModule {}
