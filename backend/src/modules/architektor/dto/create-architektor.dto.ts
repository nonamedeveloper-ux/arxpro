import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ID } from 'src/common/types/Id.type';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreateArchitektorDto {
  @ApiProperty({
    type: String,
    example: 'architektor_07',
  })
  @IsString()
  @IsNotEmpty()
  nickName: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Xatamov',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    example: "Jamol o'g'li",
  })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({
    type: Date,
    example: '2003-03-07',
  })
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  aboutMe: string;

  @ApiProperty({
    type: String,
    example: '@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  telegram: string;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  profileImageId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  backgroundImageId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  districtId: ID;

  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsOptional()
  instagram: string;
  //
  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsOptional()
  youtube: string;
  //
  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsOptional()
  tiktok: string;
  //
  // @ApiProperty({
  //   type: String,
  // })
  // @IsString()
  // @IsOptional()
  facebook: string;
  //
  // @ApiProperty({
  //   type: UUID,
  //   example: 'uuid',
  // })
  // @IsUUID()
  // @IsOptional()
  planId: ID;
  //
  // @ApiProperty({
  //   type: isBoolean,
  //   example: false,
  // })
  // @IsBoolean()
  // @IsOptional()
  isTop: boolean;
  //
  // @ApiProperty({
  //   type: Number,
  //   example: '',
  // })
  // @IsInt()
  // @IsOptional()
  viewsCount: number;
  //
  // @ApiProperty({
  //   type: Number,
  //   example: '',
  // })
  // @IsInt()
  // @IsOptional()
  raiting: number;
}

// id uuid [primary key]
// nick_name string +option
// first_name varchar +
// last_name varchar +
// middle_name varchar + option
// user_id uuid [ref: - users.id] +
// is_top bool +
// birth_date date +
// views_count intager +
// profile_image_id uuid [ref: - files.id] +
// background_image_id uuid [ref: - files.id]
// about_me text +
// instagram string
// telegram string
// youtube string
// tiktok string
// facebook string
// like integer +
// dislike integer +
// created_at timestamp +
// updated_at timestamp +
// raiting decimal +
// district_id uuid [ref: > district.id] +
