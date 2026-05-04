import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ID } from '../../../common/types/Id.type';
import { FileEntity } from '../../files/entities/file.entity';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 256 })
  title: string;

  @Column({ name: 'subtitle', type: 'varchar', nullable: true })
  subtitle: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({
    name: 'views_count',
    type: 'bigint',
    default: 0,
    nullable: true,
  })
  viewsCount: number;

  @Column({
    name: 'file_id',
    type: 'uuid',
    nullable: true,
  })
  fileId: ID;

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;
}

// id uuid [primary key] +
// views_count number +
// title varchar +
// subtitle string +
// html_content text +
// file_id uuid [ref: - files.id] +
// created_at timestamp +
// updated_at timestamp +
