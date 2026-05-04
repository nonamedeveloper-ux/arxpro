import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { HomeTitleEntity } from './entities/home-title.entity';
import { IHomeTitleRepository } from './interfaces/home-title.repository';
import { UpdateHomeTitleDto } from './dto/update-home-title.dto';

export class HomeTitleRepository implements IHomeTitleRepository {
  constructor(
    @InjectRepository(HomeTitleEntity)
    private repository: Repository<HomeTitleEntity>,
  ) {}
  async findAll(): Promise<Array<HomeTitleEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<HomeTitleEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async create(entity: HomeTitleEntity): Promise<HomeTitleEntity> {
    const newPlans = this.repository.create(entity);

    await this.repository.save(newPlans);

    return newPlans;
  }

  async updated(dto: UpdateHomeTitleDto): Promise<HomeTitleEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
