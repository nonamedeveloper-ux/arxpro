import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { IAdminRepository } from './interfaces/admin.repository';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ID } from 'src/common/types/Id.type';

export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectRepository(AdminEntity) private repository: Repository<AdminEntity>,
  ) {}
  async findAll(): Promise<Array<AdminEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<AdminEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneUserId(userId: ID): Promise<AdminEntity | undefined> {
    return await this.repository.findOneBy({ userId });
  }

  async insert(entity: AdminEntity): Promise<AdminEntity> {
    const newAdmin = this.repository.create(entity);

    await this.repository.save(newAdmin);

    return newAdmin;
  }

  async update(dto: UpdateAdminDto): Promise<AdminEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
