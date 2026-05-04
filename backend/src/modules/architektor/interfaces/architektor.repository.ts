// import { UpdateArchitektorDto } from '../dto/update-architektor.dto';
import { UpdateArchitektorDto } from '../dto/update-architektor.dto';
import { ArchitektorEntity } from '../entities/architektor.entity';
import { ID } from '../../../common/types/Id.type';

export interface IArchitektorRepository {
  findAll(): Promise<Array<ArchitektorEntity>>;
  findOneById(id: ID): Promise<ArchitektorEntity | undefined>;
  findOneByNickeName(nickName: string): Promise<ArchitektorEntity | undefined>;
  insert(dto: ArchitektorEntity): Promise<ArchitektorEntity>;
  update(dto: UpdateArchitektorDto): Promise<ArchitektorEntity>;
  delete(id: string): void;
}
