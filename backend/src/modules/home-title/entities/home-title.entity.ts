import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { ID } from '../../../common/types/Id.type';

@Entity('home_title')
export class HomeTitleEntity extends BaseEntity {
  @Column({
    name: 'title',
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'file_id',
    type: 'uuid',
    nullable: false,
  })
  fileId: ID;

  @Column({
    name: 'filePath',
    type: 'text',
    nullable: true,
  })
  filePath: string;
}
