import { Injectable } from '@nestjs/common';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { IUserMessageService } from './interfaces/user-message.service';
import { ResData } from '../../lib/resData';
import { UserMessageEntity } from './entities/user-message.entity';
import { ID } from '../../common/types/Id.type';
import { UserMessageRepository } from './user-message.repository';
import { UserMessageNotFoundExseption } from './exception/user-message.exception';

@Injectable()
export class UserMessageService implements IUserMessageService {
  constructor(private readonly repository: UserMessageRepository) {}

  async findAll(): Promise<ResData<Array<UserMessageEntity>>> {
    const usersMessage = await this.repository.findAll();

    return new ResData<Array<UserMessageEntity>>(
      'get all users message',
      200,
      usersMessage,
    );
  }

  async findOneById(id: ID): Promise<ResData<UserMessageEntity | undefined>> {
    const foundUserMessage = await this.repository.findOneById(id);

    if (!foundUserMessage) {
      throw new UserMessageNotFoundExseption();
    }

    return new ResData<UserMessageEntity>(
      'get by id user message',
      200,
      foundUserMessage,
    );
  }

  async create(dto: CreateUserMessageDto): Promise<ResData<UserMessageEntity>> {
    const newData = new UserMessageEntity();

    Object.assign(newData, dto);

    const newUserMessage = await this.repository.insert(newData);

    return new ResData<UserMessageEntity>('created', 200, newUserMessage);
  }

  async delete(id: ID): Promise<ResData<UserMessageEntity | undefined>> {
    const foundUserMessage = await this.repository.findOneById(id);

    if (!foundUserMessage) {
      throw new UserMessageNotFoundExseption();
    }

    await this.repository.delete(id);

    return new ResData<UserMessageEntity>('deleted', 200, foundUserMessage);
  }
}
