import { Injectable } from '@nestjs/common';
import { ISubscribersService } from './interfaces/subscribers.service';
import { SubscriberEntity } from './entities/subscriber.entity';
import { ResData } from '../../lib/resData';
import { ID } from '../../common/types/Id.type';
import { UserEntity } from '../user/entities/user.entity';
import { SubscribersRepository } from './subscribers.repository';
import { UserNotFoundExseption } from '../user/exception/user.exception';
import { SubscribersNotFoundException, UserIdFoundException } from "./exception/subscribers.exception";
import { hashed } from '../../lib/bcrypt';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService implements ISubscribersService {
  constructor(private readonly repository: SubscribersRepository) {}

  async findAll(): Promise<ResData<Array<SubscriberEntity>>> {
    const subscribers = await this.repository.findAll();

    return new ResData<Array<SubscriberEntity>>(
      'get all users',
      200,
      subscribers,
    );
  }

  async findOneById(id: ID): Promise<ResData<SubscriberEntity | undefined>> {
    const foundSubscribers = await this.repository.findOneById(id);

    if (!foundSubscribers) {
      throw new SubscribersNotFoundException();
    }

    return new ResData<SubscriberEntity>(
      'get by id subscribers',
      200,
      foundSubscribers,
    );
  }

  async findOneByUserId(
    userId: ID,
  ): Promise<ResData<SubscriberEntity | undefined>> {
    const foundSubscribers = await this.repository.findOneByUserId(userId);

    if (foundSubscribers) {
      throw new UserIdFoundException();
    }

    return new ResData<SubscriberEntity>(
      'get by id subscribers',
      200,
      foundSubscribers,
    );
  }

  async create(dto: CreateSubscriberDto): Promise<ResData<SubscriberEntity>> {
    const newData = new SubscriberEntity();

    Object.assign(newData, dto);

    const newSubscribers = await this.repository.insert(newData);

    return new ResData<SubscriberEntity>('created', 200, newSubscribers);
  }

  async delete(id: ID): Promise<ResData<SubscriberEntity | undefined>> {
    const foundSubscribers = await this.repository.findOneById(id);

    if (!foundSubscribers) {
      throw new SubscribersNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<SubscriberEntity>('delete', 200, foundSubscribers);
  }
}
