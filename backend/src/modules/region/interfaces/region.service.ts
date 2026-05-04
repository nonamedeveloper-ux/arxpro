import { ResData } from 'src/lib/resData';
import { CreateRegionDto } from '../dto/create-region.dto';
import { RegionEntity } from '../entities/region.entity';
import { UpdateRegionDto } from '../dto/update-region.dto';
import { ID } from 'src/common/types/Id.type';

export interface IRegionService {
  findAll(): Promise<ResData<Array<RegionEntity>>>;
  findOneById(id: ID): Promise<ResData<RegionEntity | undefined>>;
  create(dto: CreateRegionDto): Promise<ResData<RegionEntity>>;
  updated(dto: UpdateRegionDto, id: ID): Promise<ResData<RegionEntity>>;
  delete(id: ID): Promise<ResData<RegionEntity | undefined>>;
}
