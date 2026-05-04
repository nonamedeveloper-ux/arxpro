import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @Column({ name: 'content', type: 'varchar', nullable: false })
  content: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    nullable: true,
  })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  replies: CommentEntity[];

  @Column({ name: 'post_id', type: 'uuid', nullable: false })
  postId: string;

  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  parentId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @Column({ name: 'architektor_id', type: 'uuid', nullable: true })
  architektorId: string;
}
