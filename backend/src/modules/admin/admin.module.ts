import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { UserEntity } from '../user/entities/user.entity';
import { FileEntity } from '../files/entities/file.entity';
import { AdminRepository } from './admin.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, UserEntity, FileEntity])],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository,
    UserService,
    UserRepository,
    FileService,
    FileRepository,
  ],
})
export class AdminModule {}
