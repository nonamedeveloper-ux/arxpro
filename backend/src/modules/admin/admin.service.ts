import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { ResData } from 'src/lib/resData';
import { IAdminService } from './interfaces/admin.service';
import {
  AdminNotFoundException,
  UserIdAdminException,
} from './exception/admin.exception';
import { AdminRepository } from './admin.repository';
import { ID } from 'src/common/types/Id.type';

@Injectable()
export class AdminService implements IAdminService {
  constructor(private readonly repository: AdminRepository) {}

  async create(createAdminDto: CreateAdminDto): Promise<ResData<AdminEntity>> {
    const newAdmin = new AdminEntity();

    const newData = Object.assign(newAdmin, createAdminDto);

    const newAdminEntity = await this.repository.insert(newData);

    return new ResData<AdminEntity>('success', 201, newAdminEntity);
  }

  async findAll(): Promise<ResData<Array<AdminEntity>>> {
    const admins = await this.repository.findAll();

    return new ResData<Array<AdminEntity>>('get all admins', 200, admins);
  }

  async findOneById(id: ID): Promise<ResData<AdminEntity | undefined>> {
    const foundAdmin = await this.repository.findOneById(id);

    if (!foundAdmin) {
      throw new AdminNotFoundException();
    }

    return new ResData<AdminEntity>('get by id admin', 200, foundAdmin);
  }

  async findOneUserId(userId: ID): Promise<ResData<AdminEntity | undefined>> {
    const foundAdmin = await this.repository.findOneUserId(userId);

    if (foundAdmin) {
      throw new UserIdAdminException();
    }

    return new ResData<AdminEntity>('get by id admin', 200, foundAdmin);
  }

  async updated(dto: UpdateAdminDto, id: ID): Promise<ResData<AdminEntity>> {
    const foundAdmin = await this.repository.findOneById(id);

    if (!foundAdmin) {
      throw new AdminNotFoundException();
    }

    const newData = Object.assign(foundAdmin, dto);

    const updateUser = await this.repository.update(newData);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: ID): Promise<ResData<AdminEntity | undefined>> {
    const foundAdmin = await this.repository.findOneById(id);

    if (!foundAdmin) {
      throw new AdminNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<AdminEntity>('delete', 200, foundAdmin);
  }
}
