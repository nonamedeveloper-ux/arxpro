import { ID } from 'src/common/types/Id.type';
import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('architektors')
export class ArchitektorEntity extends BaseEntity {
  @Column({
    name: 'nick_name',
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: true,
  })
  nickName: string;

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
    name: 'middle_name',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  middleName: string;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: false,
  })
  birthDate: Date;

  @Column({
    name: 'about_me',
    type: 'text',
    nullable: false,
  })
  aboutMe: string;

  @Column({
    name: 'email',
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  userId: ID;

  @Column({
    name: 'plan_id',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  planId: ID;

  @Column({
    name: 'profile_image_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  profileImageId: ID;

  @Column({
    name: 'background_image_id',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  backgroundImageId: ID;

  @Column({
    name: 'district_id',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  districtId: ID;

  @Column({
    name: 'instagram',
    type: 'text',
    nullable: true,
  })
  instagram: string;

  @Column({
    name: 'telegram',
    type: 'text',
    nullable: false,
  })
  telegram: string;

  @Column({
    name: 'youtube',
    type: 'text',
    nullable: true,
  })
  youtube: string;

  @Column({
    name: 'tiktok',
    type: 'text',
    nullable: true,
  })
  tiktok: string;

  @Column({
    name: 'facebook',
    type: 'text',
    nullable: true,
  })
  facebook: string;

  @Column({
    name: 'raiting',
    type: 'float',
    nullable: true,
  })
  raiting: number;

  @Column({
    name: 'views_count',
    type: 'bigint',
    default: 0,
    nullable: true,
  })
  viewsCount: number;

  @Column({
    name: 'is_top',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isTop: boolean;

  @Column({
    name: 'category',
    type: 'varchar',
    nullable: true,
  })
  category: string;
}
