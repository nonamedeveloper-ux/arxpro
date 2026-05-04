import { BaseEntity } from '../../../common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('description')
export class DescriptionEntity extends BaseEntity {
  @Column({ name: 'about_us_description', type: 'text' })
  aboutUsDescription: string;

  @Column({ name: 'projects_description', type: 'text' })
  projectsDescription: string;

  @Column({ name: 'happy_customer_description', type: 'text' })
  happyCustomerDescription: string;

  @Column({ name: 'our_architektor_description', type: 'text' })
  ourArchitektorDescription: string;

  @Column({ name: 'subscribe_description', type: 'text' })
  subscribeDescription: string;

  @Column({ name: 'statistic_description', type: 'text' })
  statisticDescription: string;

  @Column({ name: 'plans_description', type: 'text', nullable: true })
  plansDescription: string;
}
