import { Injectable } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { ResData } from '../../lib/resData';
import { ID } from '../../common/types/Id.type';
import { FloorEntity } from './entities/floor.entity';
import { IFloorService } from './interfaces/project.service';
import { FloorRepository } from './floor.repository';
import { FloorNotFoundException } from "./exception/floor.exception";

@Injectable()
export class FloorService implements IFloorService {
  constructor(private readonly repository: FloorRepository) {}
  async findAll(): Promise<ResData<FloorEntity[]>> {
    const floors = await this.repository.findAll();

    return new ResData<Array<FloorEntity>>('get all floor', 200, floors);
  }

  async findOneById(id: ID): Promise<ResData<FloorEntity>> {
    const foundFloor = await this.repository.findOneById(id);

    if (!foundFloor) {
      throw new FloorNotFoundException();
    }

    return new ResData<FloorEntity>('get by id floor', 200, foundFloor);
  }

  async create(dto: CreateFloorDto): Promise<ResData<FloorEntity>> {
    const newData = new FloorEntity();

    Object.assign(newData, dto);

    const createData = await this.repository.insert(newData);

    return new ResData<FloorEntity>('created', 201, createData);
  }

  async updated(dto: UpdateFloorDto, id: ID): Promise<ResData<FloorEntity>> {
    const foundFloor = await this.repository.findOneById(id);

    if (!foundFloor) {
      throw new FloorNotFoundException();
    }

    Object.assign(foundFloor, dto);

    const updateData = await this.repository.update(foundFloor);

    return new ResData<FloorEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<FloorEntity>> {
    const foundFloor = await this.repository.findOneById(id);

    if (!foundFloor) {
      throw new FloorNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<FloorEntity>('deleted', 200, foundFloor);
  }
}
