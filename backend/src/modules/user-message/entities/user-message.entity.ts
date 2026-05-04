import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user_message')
export class UserMessageEntity extends BaseEntity {
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
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'message',
    type: 'text',
    nullable: false,
  })
  message: string;
}

// first_name string
// last_name string
// email string
// message text
