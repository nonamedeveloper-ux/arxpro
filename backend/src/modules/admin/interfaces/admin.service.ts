import { ResData } from 'src/lib/resData';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminEntity } from '../entities/admin.entity';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { ID } from 'src/common/types/Id.type';

export interface IAdminService {
  findAll(): Promise<ResData<Array<AdminEntity>>>;
  findOneById(id: ID): Promise<ResData<AdminEntity | undefined>>;
  findOneUserId(userId: ID): Promise<ResData<AdminEntity | undefined>>;
  create(dto: CreateAdminDto): Promise<ResData<AdminEntity>>;
  updated(dto: UpdateAdminDto, id: ID): Promise<ResData<AdminEntity>>;
  delete(id: ID): Promise<ResData<AdminEntity | undefined>>;
}
