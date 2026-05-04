import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminEntity } from '../entities/admin.entity';
import { ID } from 'src/common/types/Id.type';

export interface IAdminRepository {
  findAll(): Promise<Array<AdminEntity>>;
  findOneById(id: ID): Promise<AdminEntity | undefined>;
  findOneUserId(userId: ID): Promise<AdminEntity | undefined>;
  insert(dto: AdminEntity): Promise<AdminEntity>;
  update(dto: UpdateAdminDto): Promise<AdminEntity>;
  delete(id: ID): void;
}
