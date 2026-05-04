import { Injectable } from '@nestjs/common';
import { CreateArchitektorDto } from './dto/create-architektor.dto';
import { UpdateArchitektorDto } from './dto/update-architektor.dto';
import { ArchitektorRepository } from './architektor.repository';
import { IArchitektorService } from './interfaces/architektor.service';
import { ResData } from 'src/lib/resData';
import { ArchitektorEntity } from './entities/architektor.entity';
import { ID } from 'src/common/types/Id.type';
import {
  ArchitektorFoundNiceNameException,
  ArchitektorNotFoundException,
} from './exception/architektor.exception';

@Injectable()
export class ArchitektorService implements IArchitektorService {
  constructor(private readonly repository: ArchitektorRepository) {}
  async findAll(): Promise<ResData<Array<ArchitektorEntity>>> {
    const architektor = await this.repository.findAll();

    return new ResData<Array<ArchitektorEntity>>(
      'get all architektor',
      200,
      architektor,
    );
  }

  async searchArchitects(
    category?: string,
    nickName?: string,
    regionName?: string,
    pageNumber: number = 1,
    sizeNumber: number = 10,
  ): Promise<ResData<Array<any>>> {
    const architektor = await this.repository.searchArchitects(
      category,
      nickName,
      regionName,
      pageNumber,
      sizeNumber,
    );

    return new ResData<Array<any>>('get all architektor', 200, architektor);
  }

  async findOneById(id: ID): Promise<ResData<ArchitektorEntity | undefined>> {
    const foundArchitektor = await this.repository.findOneById(id);

    if (!foundArchitektor) {
      throw new ArchitektorNotFoundException();
    }

    const viewsCount = +foundArchitektor.views_count;

    const dto = { viewsCount: viewsCount + 1 };

    const newData = Object.assign(foundArchitektor, dto);

    await this.repository.update(newData);

    return new ResData<ArchitektorEntity>(
      'get by id architektor',
      200,
      foundArchitektor,
    );
  }

  async getTopArchitectsByRating(): Promise<ResData<Array<any>>> {
    const data: any = await this.repository.getTopArchitectsByRating();

    return new ResData<Array<ArchitektorEntity>>(
      'get top 10 architektor',
      200,
      data,
    );
  }

  async getUniqueCategories(): Promise<ResData<Array<any>>> {
    const data = await this.repository.getUniqueCategories();

    return new ResData<Array<any>>('get all unique categories', 200, data);
  }

  async findOneByUserId(
    userId: ID,
  ): Promise<ResData<Array<ArchitektorEntity | undefined>>> {
    const foundArchitektor = await this.repository.findOneByUserId(userId);

    if (!foundArchitektor) {
      throw new ArchitektorNotFoundException();
    }

    return new ResData<Array<ArchitektorEntity>>(
      'get by id architektor',
      200,
      foundArchitektor,
    );
  }

  async findOneByNickeName(nickName: string): Promise<ResData<any>> {
    const foundArchitektor = await this.repository.findOneByNickeName(nickName);

    if (foundArchitektor) {
      throw new ArchitektorFoundNiceNameException();
    }

    return new ResData<ArchitektorEntity>(
      'get by id architektor',
      200,
      foundArchitektor,
    );
  }

  async create(dto: CreateArchitektorDto): Promise<ResData<ArchitektorEntity>> {
    const newData = new ArchitektorEntity();

    Object.assign(newData, dto);

    const newArchitektor = await this.repository.insert(newData);

    return new ResData<ArchitektorEntity>('created', 200, newArchitektor);
  }

  async updated(
    dto: UpdateArchitektorDto,
    id: ID,
  ): Promise<ResData<ArchitektorEntity>> {
    const foundArchitektor = await this.repository.findOneById(id);

    if (!foundArchitektor) {
      throw new ArchitektorNotFoundException();
    }

    const newArchitektor = Object.assign(foundArchitektor, dto);

    const updateArchitektor = await this.repository.update(newArchitektor);

    return new ResData('updated', 201, updateArchitektor);
  }

  async delete(id: ID): Promise<ResData<ArchitektorEntity | undefined>> {
    const foundArchitektor = await this.repository.findOneById(id);

    if (!foundArchitektor) {
      throw new ArchitektorNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<ArchitektorEntity>('deleted', 200, foundArchitektor);
  }
}
