import { ID } from 'src/common/types/Id.type';
import { UserMessageEntity } from '../entities/user-message.entity';

export interface IUserMessageRepository {
  findAll(): Promise<Array<UserMessageEntity>>;
  findOneById(id: ID): Promise<UserMessageEntity | undefined>;
  insert(dto: UserMessageEntity): Promise<UserMessageEntity>;
  delete(id: ID): void;
}
