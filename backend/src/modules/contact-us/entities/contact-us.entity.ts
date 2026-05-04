import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';

@Entity('contact_us')
export class ContactUsEntity extends BaseEntity {
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'location',
    type: 'varchar',
    nullable: false,
  })
  location: string;

  @Column({
    name: 'instagram_link',
    type: 'varchar',
    nullable: true,
  })
  instagramLink: string;

  @Column({
    name: 'telegram_link',
    type: 'varchar',
    nullable: true,
  })
  telegramLink: string;

  @Column({
    name: 'facebook_link',
    type: 'varchar',
    nullable: true,
  })
  facebookLink: string;

  @Column({
    name: 'youtube_link',
    type: 'varchar',
    nullable: true,
  })
  youtubeLink: string;

  @Column({
    name: 'tiktok_link',
    type: 'varchar',
    nullable: true,
  })
  tiktokLink: string;

  @Column({
    name: 'linkedin_link',
    type: 'varchar',
    nullable: true,
  })
  linkedinLink: string;

  @Column({
    name: 'twitter_link',
    type: 'varchar',
    nullable: true,
  })
  twitterLink: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description: string;
}

// phone string
// email string
// location text
// instagram_link text
// telegram_link text
// facebook_link text
// youtube_link text
// tiktok_link text
