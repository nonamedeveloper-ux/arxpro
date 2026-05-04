import { CreateArchitektorDto } from './create-architektor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { isBoolean, IsOptional } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { ID } from '../../../common/types/Id.type';

export class UpdateArchitektorDto extends CreateArchitektorDto {
  @ApiProperty({
    type: String,
    example: 'architektor_07',
  })
  @IsOptional()
  nickName: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Xatamov',
  })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    type: String,
    example: "Jamol o'g'li",
  })
  @IsOptional()
  middleName: string;

  @ApiProperty({
    type: Date,
    example: '2003-03-07',
  })
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  aboutMe: string;

  @ApiProperty({
    type: String,
    example: '@gmail.com',
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  telegram: string;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsOptional()
  userId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsOptional()
  profileImageId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsOptional()
  backgroundImageId: ID;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsOptional()
  districtId: ID;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  instagram: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  youtube: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  tiktok: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  facebook: string;

  @ApiProperty({
    type: UUID,
    example: 'uuid',
  })
  @IsOptional()
  planId: ID;

  @ApiProperty({
    type: isBoolean,
    example: false,
  })
  @IsOptional()
  isTop: boolean;

  @ApiProperty({
    type: Number,
    example: '',
  })
  @IsOptional()
  viewsCount: number;

  @ApiProperty({
    type: Number,
    example: '',
  })
  @IsOptional()
  raiting: number;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  category: string;
}
