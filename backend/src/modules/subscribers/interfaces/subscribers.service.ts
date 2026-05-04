import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';
import { SubscriberEntity } from '../entities/subscriber.entity';

export interface ISubscribersService {
  findAll(): Promise<ResData<Array<SubscriberEntity>>>;
  findOneById(id: ID): Promise<ResData<SubscriberEntity | undefined>>;
  create(dto: SubscriberEntity): Promise<ResData<SubscriberEntity>>;
  delete(id: ID): Promise<ResData<SubscriberEntity | undefined>>;
}
