import { Column, Entity } from 'typeorm';
import { RoleEnum } from '../../../common/enums/enum';
import { BaseEntity } from '../../../common/database/base.entity';
import { ID } from '../../../common/types/Id.type';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'nick_name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  nickName: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  role: RoleEnum;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'text',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'profile_image_id',
    type: 'varchar',
    nullable: true,
  })
  profileImageId: ID;

  @Column({
    name: 'background_image_id',
    type: 'varchar',
    nullable: true,
  })
  backgroundImageId: ID;

  @Column({ name: 'bookmarks', type: 'text', array: true, nullable: true, default: [] })
  bookmarks: string[];
}
