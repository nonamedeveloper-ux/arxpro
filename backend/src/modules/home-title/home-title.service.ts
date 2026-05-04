import { Injectable } from '@nestjs/common';
import { CreateHomeTitleDto } from './dto/create-home-title.dto';
import { UpdateHomeTitleDto } from './dto/update-home-title.dto';
import { HomeTitleRepository } from './home-title.repository';
import { IHomeTitleService } from './interfaces/home-title.service';
import { ResData } from '../../lib/resData';
import { HomeTitleEntity } from './entities/home-title.entity';
import { ID } from '../../common/types/Id.type';
import { HomeTitleNotFoundException } from './exception/home-title';

@Injectable()
export class HomeTitleService implements IHomeTitleService {
  constructor(private readonly repository: HomeTitleRepository) {}

  async findAll(): Promise<ResData<Array<HomeTitleEntity>>> {
    const homeTitle = await this.repository.findAll();

    return new ResData<Array<HomeTitleEntity>>(
      'get all home title',
      200,
      homeTitle,
    );
  }

  async findOneById(id: ID): Promise<ResData<HomeTitleEntity | undefined>> {
    const foundHomeTitle = await this.repository.findOneById(id);

    if (!foundHomeTitle) {
      throw new HomeTitleNotFoundException();
    }

    return new ResData<HomeTitleEntity>('get by id plan', 201, foundHomeTitle);
  }

  async create(dto: CreateHomeTitleDto): Promise<ResData<HomeTitleEntity>> {
    const homeTitleEntity = new HomeTitleEntity();

    const newHomeTitle = Object.assign(homeTitleEntity, dto);

    const newHomeTitleEntity = await this.repository.create(newHomeTitle);

    return new ResData<HomeTitleEntity>(
      'create Home title',
      201,
      newHomeTitleEntity,
    );
  }

  async updated(
    dto: UpdateHomeTitleDto,
    id: ID,
  ): Promise<ResData<HomeTitleEntity>> {
    const foundHomeTitle = await this.repository.findOneById(id);

    if (!foundHomeTitle) {
      throw new HomeTitleNotFoundException();
    }

    const updateHomeTitle = Object.assign(foundHomeTitle, dto);

    const updateHomeTitleEntity =
      await this.repository.updated(updateHomeTitle);

    return new ResData<HomeTitleEntity>(
      'update Home  title',
      201,
      updateHomeTitleEntity,
    );
  }

  async delete(id: ID): Promise<ResData<HomeTitleEntity | undefined>> {
    const foundHomeTitle = await this.repository.findOneById(id);

    if (!foundHomeTitle) {
      throw new HomeTitleNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<HomeTitleEntity>(
      'deleted home title',
      201,
      foundHomeTitle,
    );
  }
}
