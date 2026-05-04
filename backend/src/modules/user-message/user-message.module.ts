import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { UserMessageController } from './user-message.controller';
import { UserMessageRepository } from './user-message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessageEntity } from './entities/user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMessageEntity])],
  controllers: [UserMessageController],
  providers: [UserMessageService, UserMessageRepository],
})
export class UserMessageModule {}
