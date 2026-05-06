import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ProjectEntity } from '../project/entities/project.entity';
import { OrderEntity } from '../order/entities/order.entity';
import { ArchitektorEntity } from '../architektor/entities/architektor.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, OrderEntity, ArchitektorEntity]),
    UserModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
