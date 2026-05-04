import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';
import { UserMessageEntity } from '../entities/user-message.entity';
import { CreateUserMessageDto } from '../dto/create-user-message.dto';

export interface IUserMessageService {
  findAll(): Promise<ResData<Array<UserMessageEntity>>>;
  findOneById(id: ID): Promise<ResData<UserMessageEntity | undefined>>;
  create(dto: CreateUserMessageDto): Promise<ResData<UserMessageEntity>>;
  delete(id: ID): Promise<ResData<UserMessageEntity | undefined>>;
}
