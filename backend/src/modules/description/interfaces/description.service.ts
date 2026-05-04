import { ResData } from '../../../lib/resData';
import { DescriptionEntity } from '../entities/description.entity';
import { ID } from '../../../common/types/Id.type';
import { CreateDescriptionDto } from '../dto/create-description.dto';
import { UpdateDescriptionDto } from '../dto/update-description.dto';

export interface IDescriptionService {
  findAll(): Promise<ResData<Array<DescriptionEntity>>>;
  findOneById(id: ID): Promise<ResData<DescriptionEntity>>;
  insert(data: CreateDescriptionDto): Promise<ResData<DescriptionEntity>>;
  update(
    data: UpdateDescriptionDto,
    id: ID,
  ): Promise<ResData<DescriptionEntity>>;
  delete(id: ID): Promise<ResData<DescriptionEntity>>;
}
