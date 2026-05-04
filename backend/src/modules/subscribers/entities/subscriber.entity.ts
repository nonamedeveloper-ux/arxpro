import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';
import { ID } from '../../../common/types/Id.type';

@Entity('subscribers')
export class SubscriberEntity extends BaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  userId: ID;
}
