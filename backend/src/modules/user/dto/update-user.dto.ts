// import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum } from '../../../common/enums/enum';
import { ID } from "../../../common/types/Id.type";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
const Role = [RoleEnum.ARCHITEKTOR, RoleEnum.USER];

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    type: String,
    example: '+998991853703',
  })
  @IsString()
  @Length(13, 13)
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: String,
    example: '0703',
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon0703',
  })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({
    enum: RoleEnum,
    example: RoleEnum.USER,
  })
  @IsEnum(Role)
  @IsOptional()
  role: RoleEnum;

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
    example: '@gmail.com',
  })
  @IsOptional()
  email: string;

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
}
