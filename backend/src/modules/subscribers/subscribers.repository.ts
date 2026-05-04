import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { SubscriberEntity } from './entities/subscriber.entity';
import { ISubscribersRepository } from './interfaces/subscribers.repository';

export class SubscribersRepository implements ISubscribersRepository {
  constructor(
    @InjectRepository(SubscriberEntity)
    private repository: Repository<SubscriberEntity>,
  ) {}

  async findAll(): Promise<Array<SubscriberEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<SubscriberEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByUserId(userId: ID): Promise<SubscriberEntity | undefined> {
    return await this.repository.findOneBy({ userId });
  }

  async insert(entity: SubscriberEntity): Promise<SubscriberEntity> {
    const newSubscribers = this.repository.create(entity);

    await this.repository.save(newSubscribers);

    return newSubscribers;
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
