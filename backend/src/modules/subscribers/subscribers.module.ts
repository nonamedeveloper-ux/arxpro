import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './entities/subscriber.entity';
import { SubscribersRepository } from './subscribers.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity, UserEntity])],
  controllers: [SubscribersController],
  providers: [
    SubscribersService,
    SubscribersRepository,
    UserService,
    UserRepository,
  ],
})
export class SubscribersModule {}
