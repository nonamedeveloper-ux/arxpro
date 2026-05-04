import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('regions')
export class RegionEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

// id uuid [pk] +
// name string +
