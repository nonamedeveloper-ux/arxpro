import { UpdateDistrictDto } from '../dto/update-district.dto';
import { DistrictEntity } from '../entities/district.entity';
import { ID } from 'src/common/types/Id.type';

export interface IDistrictRepository {
  findAll(): Promise<Array<DistrictEntity>>;
  findOneById(id: ID): Promise<DistrictEntity | undefined>;
  findOneByRegionId(regionId: ID): Promise<Array<DistrictEntity | undefined>>;
  insert(dto: DistrictEntity): Promise<DistrictEntity>;
  update(dto: UpdateDistrictDto): Promise<DistrictEntity>;
  delete(id: ID): void;
}
