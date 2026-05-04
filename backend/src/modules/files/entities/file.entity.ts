import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { ID } from '../../../common/types/Id.type';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ name: 'file_path', type: 'text', nullable: false })
  filePath: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  projectsId: ID;
}

// id uuid [primary key] +
// file_path string +
// name string +
// mimetype string +
// size decimal +
// description string +
// created_by uuid +
// create_date datetime +
// update_date datetime +
