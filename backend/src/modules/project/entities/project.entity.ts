import { BaseEntity } from 'src/common/database/base.entity';
import { ID } from 'src/common/types/Id.type';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { ArchitektorEntity } from '../../architektor/entities/architektor.entity';

@Entity('projects')
export class ProjectEntity extends BaseEntity {
  @Column({ name: 'name', type: 'int' })
  name: number;

  @Column({ name: 'size', type: 'varchar', nullable: false })
  size: string;

  @Column({ name: 'area', type: 'varchar', nullable: false })
  area: string;

  @Column({
    name: 'price',
    type: 'bigint',
  })
  price: number;

  @Column({ name: 'teg', type: 'varchar', nullable: true })
  tegs: string;

  @Column({ name: 'views_count', type: 'int', nullable: true, default: 0 })
  viewsCount: number;

  @Column({
    name: 'is_top',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isTop: boolean;

  @Column({
    name: 'raiting',
    type: 'float',
    nullable: true,
  })
  raiting: number;

  @Column({ name: 'project_image_id', type: 'jsonb', nullable: false })
  projectImageId: Array<string>;

  @ManyToMany(() => ArchitektorEntity)
  @JoinColumn({ name: 'architektor_id' })
  architektorId: ID;

  @Column({ name: 'project_video_id', type: 'uuid', nullable: true })
  projectVideoId: ID;
}
