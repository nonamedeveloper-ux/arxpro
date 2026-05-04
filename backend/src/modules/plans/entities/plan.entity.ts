import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('plans')
export class PlansEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'price',
    type: 'int',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'year_price',
    type: 'int',
    nullable: false,
  })
  yearPrice: number;

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
}

// name string
// price number
// year_price number
// title string
// desciption string
