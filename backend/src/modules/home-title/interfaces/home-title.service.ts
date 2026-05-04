import { ResData } from 'src/lib/resData';

import { ID } from 'src/common/types/Id.type';
import { HomeTitleEntity } from '../entities/home-title.entity';
import { CreateHomeTitleDto } from '../dto/create-home-title.dto';
import { UpdateHomeTitleDto } from '../dto/update-home-title.dto';

export interface IHomeTitleService {
  findAll(): Promise<ResData<Array<HomeTitleEntity>>>;
  findOneById(id: ID): Promise<ResData<HomeTitleEntity | undefined>>;
  create(dto: CreateHomeTitleDto): Promise<ResData<HomeTitleEntity>>;
  updated(dto: UpdateHomeTitleDto, id: ID): Promise<ResData<HomeTitleEntity>>;
  delete(id: ID): Promise<ResData<HomeTitleEntity | undefined>>;
}
