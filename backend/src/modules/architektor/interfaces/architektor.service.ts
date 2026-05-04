import { ResData } from 'src/lib/resData';
import { ArchitektorEntity } from '../entities/architektor.entity';
import { CreateArchitektorDto } from '../dto/create-architektor.dto';
import { UpdateArchitektorDto } from '../dto/update-architektor.dto';
import { ID } from 'src/common/types/Id.type';

export interface IArchitektorService {
  findAll(): Promise<ResData<Array<ArchitektorEntity>>>;
  findOneById(id: ID): Promise<ResData<ArchitektorEntity | undefined>>;
  findOneByNickeName(
    nickName: string,
  ): Promise<ResData<ArchitektorEntity | undefined>>;
  create(dto: CreateArchitektorDto): Promise<ResData<ArchitektorEntity>>;
  updated(
    dto: UpdateArchitektorDto,
    id: ID,
  ): Promise<ResData<ArchitektorEntity>>;
  delete(id: ID): Promise<ResData<ArchitektorEntity | undefined>>;
}
