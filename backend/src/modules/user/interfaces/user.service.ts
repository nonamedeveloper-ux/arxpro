import { ResData } from 'src/lib/resData';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ID } from 'src/common/types/Id.type';

export interface IUserService {
  findAll(): Promise<ResData<Array<UserEntity>>>;
  findOneById(id: ID): Promise<ResData<UserEntity | undefined>>;
  findOneByNickName(phone: string): Promise<ResData<UserEntity | undefined>>;
  findOneByPhone(phone: string): Promise<ResData<UserEntity | undefined>>;
  create(dto: CreateUserDto): Promise<ResData<UserEntity>>;
  updated(dto: UpdateUserDto, id: ID): Promise<ResData<UserEntity>>;
  forgetPassword(dto: UpdateUserDto): Promise<ResData<UserEntity>>;
  delete(id: ID): Promise<ResData<UserEntity | undefined>>;
}
