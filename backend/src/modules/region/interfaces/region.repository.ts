import { UpdateRegionDto } from '../dto/update-region.dto';
import { RegionEntity } from '../entities/region.entity';
import { ID } from 'src/common/types/Id.type';

export interface IRegionRepository {
  findAll(): Promise<Array<RegionEntity>>;
  findOneById(id: ID): Promise<RegionEntity | undefined>;
  insert(dto: RegionEntity): Promise<RegionEntity>;
  update(dto: UpdateRegionDto): Promise<RegionEntity>;
  delete(id: ID): void;
}
