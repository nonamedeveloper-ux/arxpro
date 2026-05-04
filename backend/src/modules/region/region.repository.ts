import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegionEntity } from './entities/region.entity';
import { IRegionRepository } from './interfaces/region.repository';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ID } from 'src/common/types/Id.type';

export class RegionRepository implements IRegionRepository {
  constructor(
    @InjectRepository(RegionEntity)
    private repository: Repository<RegionEntity>,
  ) {}
  async findAll(): Promise<Array<RegionEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<RegionEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: RegionEntity): Promise<RegionEntity> {
    const newRegion = this.repository.create(entity);

    await this.repository.save(newRegion);

    return newRegion;
  }

  async update(dto: UpdateRegionDto): Promise<RegionEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
