import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionEntity } from './entities/description.entity';
import { DescriptionRepository } from './description.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionEntity, UserEntity])],
  controllers: [DescriptionController],
  providers: [
    DescriptionService,
    DescriptionRepository,
    UserService,
    UserRepository,
  ],
})
export class DescriptionModule {}
