import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { ContactUsEntity } from './entities/contact-us.entity';

export class ContactUsRepository {
  constructor(
    @InjectRepository(ContactUsEntity)
    private repository: Repository<ContactUsEntity>,
  ) {}

  async findAll(): Promise<Array<ContactUsEntity>> {
    return await this.repository.find();
  }

  // async insert(entity: ContactUsEntity): Promise<ContactUsEntity> {
  //   const newArchitektor = this.repository.create(entity);
  //
  //   await this.repository.save(newArchitektor);
  //
  //   return newArchitektor;
  // }
  //
  // async update(dto: UpdateArchitektorDto): Promise<ContactUsEntity> {
  //   return await this.repository.save(dto);
  // }
  //
  // async delete(id: ID) {
  //   return await this.repository.delete(id);
  // }
}
