import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ID } from 'src/common/types/Id.type';

export interface IUserRepository {
  findAll(): Promise<Array<UserEntity>>;
  findOneById(id: ID): Promise<UserEntity | undefined>;
  findOneByNickName(phone: string): Promise<UserEntity | undefined>;
  findOneByPhone(phone: string): Promise<UserEntity | undefined>;
  insert(dto: UserEntity): Promise<UserEntity>;
  update(dto: UpdateUserDto): Promise<UserEntity>;
  delete(id: ID): void;
}
