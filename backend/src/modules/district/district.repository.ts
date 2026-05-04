import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictEntity } from './entities/district.entity';
import { IDistrictRepository } from './interfaces/district.repository';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ID } from 'src/common/types/Id.type';

export class DistrictRepository implements IDistrictRepository {
  constructor(
    @InjectRepository(DistrictEntity)
    private repository: Repository<DistrictEntity>,
  ) {}
  async findAll(): Promise<Array<DistrictEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<DistrictEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByRegionId(
    regionId: ID,
  ): Promise<Array<DistrictEntity | undefined>> {
    return await this.repository.find({ where: { regionId } });
  }

  async insert(entity: DistrictEntity): Promise<DistrictEntity> {
    const newDistrict = this.repository.create(entity);

    await this.repository.save(newDistrict);

    return newDistrict;
  }

  async update(dto: UpdateDistrictDto): Promise<DistrictEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
