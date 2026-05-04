import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { IRegionService } from './interfaces/region.service';
import { ResData } from 'src/lib/resData';
import { RegionEntity } from './entities/region.entity';
import { ID } from 'src/common/types/Id.type';
import { RegionRepository } from './region.repository';
import { RegionNotFoundException } from './exception/region.exception';

@Injectable()
export class RegionService implements IRegionService {
  constructor(private readonly repository: RegionRepository) {}

  async findAll(): Promise<ResData<RegionEntity[]>> {
    const regions = await this.repository.findAll();

    return new ResData<Array<RegionEntity>>('get all regions', 200, regions);
  }

  async findOneById(id: ID): Promise<ResData<RegionEntity>> {
    const foundRegion = await this.repository.findOneById(id);

    if (!foundRegion) {
      throw new RegionNotFoundException();
    }

    return new ResData<RegionEntity>('get by id region', 200, foundRegion);
  }

  async create(dto: CreateRegionDto): Promise<ResData<RegionEntity>> {
    const newData = new RegionEntity();

    Object.assign(newData, dto);

    const createData = await this.repository.insert(newData);

    return new ResData<RegionEntity>('created', 201, createData);
  }

  async updated(dto: UpdateRegionDto, id: ID): Promise<ResData<RegionEntity>> {
    const foundRegion = await this.repository.findOneById(id);

    if (!foundRegion) {
      throw new RegionNotFoundException();
    }

    const newRegion = Object.assign(foundRegion, dto);

    const updateData = await this.repository.update(newRegion);

    return new ResData<RegionEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<RegionEntity>> {
    const foundRegion = await this.repository.findOneById(id);

    if (!foundRegion) {
      throw new RegionNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<RegionEntity>('deleted', 200, foundRegion);
  }
}
