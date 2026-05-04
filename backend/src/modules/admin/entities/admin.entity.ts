import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';
import { ID } from 'src/common/types/Id.type';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  userId: ID;

  @Column({
    name: 'file_id',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  fileId: ID;
}

// id uuid [primary key] +
// first_name varchar +
// last_name varchar +
// user_id uuid [ref: - users.id] +
// file_id uuid [ref: - files.id] +
// created_at timestamp +
// updated_at timestamp +
