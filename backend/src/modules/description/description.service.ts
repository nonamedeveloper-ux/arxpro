import { Injectable } from '@nestjs/common';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { DescriptionRepository } from './description.repository';
import { ResData } from '../../lib/resData';
import { DescriptionEntity } from './entities/description.entity';
import { ID } from '../../common/types/Id.type';
import { DescriptionNotFoundException } from './esception/description.exception';
import { IDescriptionService } from './interfaces/description.service';

@Injectable()
export class DescriptionService implements IDescriptionService {
  constructor(private readonly repository: DescriptionRepository) {}

  async insert(dto: CreateDescriptionDto) {
    const data = new DescriptionEntity();

    Object.assign(data, dto);

    const newData = await this.repository.insert(data);

    return new ResData<DescriptionEntity>('created', 201, newData);
  }

  async findAll(): Promise<ResData<DescriptionEntity[]>> {
    const description = await this.repository.findAll();

    return new ResData<Array<DescriptionEntity>>(
      'get all description',
      200,
      description,
    );
  }

  async findOneById(id: ID) {
    const foundDescription = await this.repository.findOneById(id);

    if (!foundDescription) {
      throw new DescriptionNotFoundException();
    }

    return new ResData<DescriptionEntity>(
      'get one by id description',
      200,
      foundDescription,
    );
  }

  async update(dto: UpdateDescriptionDto, id: ID) {
    const foundDescription = await this.repository.findOneById(id);

    if (!foundDescription) {
      throw new DescriptionNotFoundException();
    }

    const newData = Object.assign(foundDescription, dto);

    const updateDescription = await this.repository.update(newData);

    return new ResData('updated', 201, updateDescription);
  }

  async delete(id: ID): Promise<ResData<DescriptionEntity>> {
    const foundDescription = await this.repository.findOneById(id);

    if (!foundDescription) {
      throw new DescriptionNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData('deleted', 204, foundDescription);
  }
}
