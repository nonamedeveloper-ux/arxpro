import { ID } from 'src/common/types/Id.type';
import { PlansEntity } from '../entities/plan.entity';
import { UpdatePlanDto } from '../dto/update-plan.dto';

export interface IPlansRepository {
  findAll(): Promise<Array<PlansEntity>>;
  findOneById(id: ID): Promise<PlansEntity | undefined>;
  create(dto: PlansEntity): Promise<PlansEntity>;
  updated(dto: UpdatePlanDto): Promise<PlansEntity>;
  delete(id: ID): void;
}
