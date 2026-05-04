import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { IDistrictService } from './interfaces/district.service';
import { DistrictEntity } from './entities/district.entity';
import { ResData } from 'src/lib/resData';
import { DistrictNotFoundException } from './exception/admin.exception';
import { ID } from 'src/common/types/Id.type';
import { DistrictRepository } from './district.repository';
import { raw } from 'express';

@Injectable()
export class DistrictService implements IDistrictService {
  constructor(private readonly repository: DistrictRepository) {}

  async findAll(): Promise<ResData<DistrictEntity[]>> {
    const district = await this.repository.findAll();

    return new ResData<Array<DistrictEntity>>(
      'get all district',
      200,
      district,
    );
  }

  async findOneById(id: ID): Promise<ResData<DistrictEntity>> {
    const foundDistrict = await this.repository.findOneById(id);

    if (!foundDistrict) {
      throw new DistrictNotFoundException();
    }

    return new ResData<DistrictEntity>(
      'get by id district',
      200,
      foundDistrict,
    );
  }

  async findOneByRegionId(
    regionId: ID,
  ): Promise<ResData<Array<DistrictEntity | any>>> {
    const regions = await this.repository.findOneByRegionId(regionId);

    return new ResData<Array<DistrictEntity>>(
      'get by region id ',
      200,
      regions,
    );
  }

  async create(dto: CreateDistrictDto): Promise<ResData<DistrictEntity>> {
    const newData = new DistrictEntity();

    Object.assign(newData, dto);

    const createData = await this.repository.insert(newData);

    return new ResData<DistrictEntity>('created', 201, createData);
  }

  async updated(
    dto: UpdateDistrictDto,
    id: ID,
  ): Promise<ResData<DistrictEntity>> {
    const foundDistrict = await this.repository.findOneById(id);

    if (!foundDistrict) {
      throw new DistrictNotFoundException();
    }

    Object.assign(foundDistrict, dto);

    const updateData = await this.repository.update(foundDistrict);

    return new ResData<DistrictEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<DistrictEntity>> {
    const foundDistrict = await this.repository.findOneById(id);

    if (!foundDistrict) {
      throw new DistrictNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<DistrictEntity>('deleted', 200, foundDistrict);
  }
}
