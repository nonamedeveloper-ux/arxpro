import { ResData } from 'src/lib/resData';
import { FloorEntity } from '../entities/floor.entity';
import { CreateFloorDto } from '../dto/create-floor.dto';
import { UpdateFloorDto } from '../dto/update-floor.dto';
import { ID } from 'src/common/types/Id.type';

export interface IFloorService {
  findAll(): Promise<ResData<Array<FloorEntity>>>;
  findOneById(id: ID): Promise<ResData<FloorEntity | undefined>>;
  create(dto: CreateFloorDto): Promise<ResData<FloorEntity>>;
  updated(dto: UpdateFloorDto, id: ID): Promise<ResData<FloorEntity>>;
  delete(id: ID): Promise<ResData<FloorEntity | undefined>>;
}
