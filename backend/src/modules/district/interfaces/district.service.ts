import { ResData } from 'src/lib/resData';
import { CreateDistrictDto } from '../dto/create-district.dto';
import { DistrictEntity } from '../entities/district.entity';
import { UpdateDistrictDto } from '../dto/update-district.dto';
import { ID } from 'src/common/types/Id.type';

export interface IDistrictService {
  findAll(): Promise<ResData<Array<DistrictEntity>>>;
  findOneById(id: ID): Promise<ResData<DistrictEntity | undefined>>;
  findOneByRegionId(
    regionId: ID,
  ): Promise<ResData<Array<DistrictEntity | undefined>>>;
  create(dto: CreateDistrictDto): Promise<ResData<DistrictEntity>>;
  updated(dto: UpdateDistrictDto, id: ID): Promise<ResData<DistrictEntity>>;
  delete(id: ID): Promise<ResData<DistrictEntity | undefined>>;
}
