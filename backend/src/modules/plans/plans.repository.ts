import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { IPlansRepository } from './interfaces/plans.repository';
import { PlansEntity } from './entities/plan.entity';
import { UpdatePlanDto } from './dto/update-plan.dto';

export class PlansRepository implements IPlansRepository {
  constructor(
    @InjectRepository(PlansEntity) private repository: Repository<PlansEntity>,
  ) {}
  async findAll(): Promise<Array<PlansEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<PlansEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async create(entity: PlansEntity): Promise<PlansEntity> {
    const newPlans = this.repository.create(entity);

    await this.repository.save(newPlans);

    return newPlans;
  }

  async updated(dto: UpdatePlanDto): Promise<PlansEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
