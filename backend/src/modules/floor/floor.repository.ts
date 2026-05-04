import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/Id.type';
import { FloorEntity } from './entities/floor.entity';
import { UpdateFloorDto } from './dto/update-floor.dto';

export class FloorRepository {
  constructor(
    @InjectRepository(FloorEntity)
    private repository: Repository<FloorEntity>,
  ) {}

  async findAll(): Promise<Array<FloorEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<FloorEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: FloorEntity): Promise<FloorEntity> {
    const newFloor = this.repository.create(entity);

    await this.repository.save(newFloor);

    return newFloor;
  }

  async update(dto: UpdateFloorDto): Promise<FloorEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
