import { Module } from '@nestjs/common';
import { ArchitektorService } from './architektor.service';
import { ArchitektorController } from './architektor.controller';
import { ArchitektorRepository } from './architektor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchitektorEntity } from './entities/architektor.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { FileEntity } from '../files/entities/file.entity';
import { DistrictEntity } from '../district/entities/district.entity';
import { PlansEntity } from '../plans/entities/plan.entity';
import { FileService } from '../files/files.service';
import { FileRepository } from '../files/files.repository';
import { PlansService } from '../plans/plans.service';
import { PlansRepository } from '../plans/plans.repository';
import { DistrictService } from '../district/district.service';
import { DistrictRepository } from '../district/district.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArchitektorEntity,
      UserEntity,
      FileEntity,
      DistrictEntity,
      PlansEntity,
    ]),
  ],
  controllers: [ArchitektorController],
  providers: [
    ArchitektorService,
    ArchitektorRepository,
    UserService,
    UserRepository,
    FileService,
    FileRepository,
    PlansService,
    PlansRepository,
    DistrictService,
    DistrictRepository,
  ],
})
export class ArchitektorModule {}
