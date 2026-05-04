import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { IPlansService } from './interfaces/plans.service';
import { ID } from 'src/common/types/Id.type';
import { ResData } from 'src/lib/resData';
import { PlansEntity } from './entities/plan.entity';
import { PlansRepository } from './plans.repository';
import { PlansNotFoundException } from './exception/plans.exception';

@Injectable()
export class PlansService implements IPlansService {
  constructor(private readonly repository: PlansRepository) {}

  async findAll(): Promise<ResData<Array<PlansEntity>>> {
    const plans = await this.repository.findAll();

    return new ResData<Array<PlansEntity>>('get all plans', 200, plans);
  }

  async findOneById(id: ID): Promise<ResData<PlansEntity | undefined>> {
    const foundPlan = await this.repository.findOneById(id);

    if (!foundPlan) {
      throw new PlansNotFoundException();
    }

    return new ResData<PlansEntity>('get by id plan', 201, foundPlan);
  }

  async create(dto: CreatePlanDto): Promise<ResData<PlansEntity>> {
    const planEntity = new PlansEntity();

    const newPlan = Object.assign(planEntity, dto);

    const newPlanEntity = await this.repository.create(newPlan);

    return new ResData<PlansEntity>('create plan', 201, newPlanEntity);
  }

  async updated(dto: UpdatePlanDto, id: ID): Promise<ResData<PlansEntity>> {
    const foundPlan = await this.repository.findOneById(id);

    if (!foundPlan) {
      throw new PlansNotFoundException();
    }

    const updatePlan = Object.assign(foundPlan, dto);

    const updatePlanEntity = await this.repository.updated(updatePlan);

    return new ResData<PlansEntity>('update plan', 201, updatePlanEntity);
  }

  async delete(id: ID): Promise<ResData<PlansEntity | undefined>> {
    const foundPlan = await this.repository.findOneById(id);

    if (!foundPlan) {
      throw new PlansNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<PlansEntity>('deleted plan', 201, foundPlan);
  }
}
