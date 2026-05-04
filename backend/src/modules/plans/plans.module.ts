import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansEntity } from './entities/plan.entity';
import { PlansRepository } from './plans.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity, UserEntity])],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository, UserService, UserRepository],
})
export class PlansModule {}
