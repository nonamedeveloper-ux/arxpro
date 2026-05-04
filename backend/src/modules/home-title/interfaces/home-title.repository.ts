import { ID } from 'src/common/types/Id.type';
import { CreateHomeTitleDto } from '../dto/create-home-title.dto';
import { UpdateHomeTitleDto } from '../dto/update-home-title.dto';
import { HomeTitleEntity } from '../entities/home-title.entity';

export interface IHomeTitleRepository {
  findAll(): Promise<Array<HomeTitleEntity>>;
  findOneById(id: ID): Promise<HomeTitleEntity | undefined>;
  create(dto: CreateHomeTitleDto): Promise<HomeTitleEntity>;
  updated(dto: UpdateHomeTitleDto): Promise<HomeTitleEntity>;
  delete(id: ID): void;
}
