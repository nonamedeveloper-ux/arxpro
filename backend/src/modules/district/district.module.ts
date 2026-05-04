import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictEntity } from './entities/district.entity';
import { DistrictRepository } from './district.repository';
import { RegionEntity } from '../region/entities/region.entity';
import { RegionService } from '../region/region.service';
import { RegionRepository } from '../region/region.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DistrictEntity, RegionEntity, UserEntity]),
  ],
  controllers: [DistrictController],
  providers: [
    DistrictService,
    DistrictRepository,
    RegionService,
    RegionRepository,
    UserService,
    UserRepository,
  ],
})
export class DistrictModule {}
