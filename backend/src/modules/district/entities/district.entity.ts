import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { ID } from 'src/common/types/Id.type';

@Entity('districts')
export class DistrictEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({
    name: 'region_id',
    type: 'varchar',
    nullable: false,
  })
  regionId: ID;
}

// id uud [pk] +
// name string +
// region_id uuid [ref: > region.id] +
