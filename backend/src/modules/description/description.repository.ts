import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDescriptionRepository } from './interfaces/description.repository';
import { DescriptionEntity } from './entities/description.entity';
import { ID } from '../../common/types/Id.type';
import { UpdateDescriptionDto } from './dto/update-description.dto';

export class DescriptionRepository implements IDescriptionRepository {
  constructor(
    @InjectRepository(DescriptionEntity)
    private repository: Repository<DescriptionEntity>,
  ) {}
  async findAll(): Promise<Array<DescriptionEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<DescriptionEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: DescriptionEntity): Promise<DescriptionEntity> {
    const newDescription = this.repository.create(entity);

    await this.repository.save(newDescription);

    return newDescription;
  }

  async update(dto: UpdateDescriptionDto): Promise<DescriptionEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
