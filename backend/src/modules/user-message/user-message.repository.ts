import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { UserMessageEntity } from './entities/user-message.entity';
import { IUserMessageRepository } from './interfaces/user-message.repository';

export class UserMessageRepository implements IUserMessageRepository {
  constructor(
    @InjectRepository(UserMessageEntity)
    private repository: Repository<UserMessageEntity>,
  ) {}

  async findAll(): Promise<Array<UserMessageEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<UserMessageEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: UserMessageEntity): Promise<UserMessageEntity> {
    const newUserMessage = this.repository.create(entity);

    await this.repository.save(newUserMessage);

    return newUserMessage;
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
