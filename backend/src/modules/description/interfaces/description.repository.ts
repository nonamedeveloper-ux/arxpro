import { ID } from '../../../common/types/Id.type';
import { CreateDescriptionDto } from '../dto/create-description.dto';
import { UpdateDescriptionDto } from '../dto/update-description.dto';
import { DescriptionEntity } from '../entities/description.entity';

export interface IDescriptionRepository {
  findAll(): Promise<Array<DescriptionEntity>>;
  findOneById(id: ID): Promise<DescriptionEntity>;
  insert(district: CreateDescriptionDto): Promise<DescriptionEntity>;
  update(district: UpdateDescriptionDto): Promise<DescriptionEntity>;
  delete(id: ID): void;
}
