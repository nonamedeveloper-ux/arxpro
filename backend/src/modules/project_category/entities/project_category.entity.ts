import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('project_category')
export class ProjectCategoryEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;
}

// id uuid [primary key] +
// name string +
// created_at timestamp +
// updated_at timestamp +
