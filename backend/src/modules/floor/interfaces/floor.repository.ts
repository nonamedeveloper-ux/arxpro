import { UpdateFloorDto } from '../dto/update-floor.dto';
import { FloorEntity } from '../entities/floor.entity';

export interface IFloorRepository {
  findAll(): Promise<Array<FloorEntity>>;
  findOneById(id: string): Promise<FloorEntity | undefined>;
  insert(dto: FloorEntity): Promise<FloorEntity>;
  update(dto: UpdateFloorDto): Promise<FloorEntity>;
  delete(id: string): void;
}
