import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';
import { ID } from '../../../common/types/Id.type';

@Entity('floor_data')
export class FloorEntity extends BaseEntity {
  @Column({
    name: 'floor_data',
    type: 'jsonb',
    nullable: false,
  })
  floorData: Record<string, any>;

  @Column({
    name: 'project_id',
    type: 'uuid',
    nullable: false,
  })
  projectId: ID;
}
