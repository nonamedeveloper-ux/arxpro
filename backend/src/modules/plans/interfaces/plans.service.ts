import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';
import { PlansEntity } from '../entities/plan.entity';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';

export interface IPlansService {
  findAll(): Promise<ResData<Array<PlansEntity>>>;
  findOneById(id: ID): Promise<ResData<PlansEntity | undefined>>;
  create(dto: CreatePlanDto): Promise<ResData<PlansEntity>>;
  updated(dto: UpdatePlanDto, id: ID): Promise<ResData<PlansEntity>>;
  delete(id: ID): Promise<ResData<PlansEntity | undefined>>;
}
