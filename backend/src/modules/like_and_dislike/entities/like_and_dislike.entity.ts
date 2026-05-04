import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';
import { ID } from '../../../common/types/Id.type';

@Entity('like_and_dislike')
export class LikeAndDislikeEntity extends BaseEntity {
  @Column({
    name: 'like',
    type: 'text',
    default: null,
    nullable: true,
  })
  like: number;

  @Column({
    name: 'dislike',
    type: 'text',
    default: null,
    nullable: true,
  })
  dislike: number;

  @Column({
    name: 'architektor_id',
    type: 'varchar',
    default: null,
    nullable: true,
  })
  architektorId: ID;

  @Column({
    name: 'project_id',
    type: 'varchar',
    default: null,
    nullable: true,
  })
  projectId: ID;
}

// id uuid [primary key]
// like number
// dislike number
// architektor_id uuid [ref: - architektors.id]
// project_id uuid [ref: - projects.id]
// created_at timestamp
// updated_at timestamp
