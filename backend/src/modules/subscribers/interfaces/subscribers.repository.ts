import { ID } from 'src/common/types/Id.type';
import { SubscriberEntity } from '../entities/subscriber.entity';

export interface ISubscribersRepository {
  findAll(): Promise<Array<SubscriberEntity>>;
  findOneById(id: ID): Promise<SubscriberEntity | undefined>;
  insert(dto: SubscriberEntity): Promise<SubscriberEntity>;
  delete(id: ID): void;
}
