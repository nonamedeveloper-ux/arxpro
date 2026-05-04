import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { RegionRepository } from './region.repository';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity, UserEntity])],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository, UserService, UserRepository],
})
export class RegionModule {}
