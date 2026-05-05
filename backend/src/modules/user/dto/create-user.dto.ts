import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

const Role = [RoleEnum.ARCHITECT, RoleEnum.CLIENT];

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: '+998991853703',
  })
  @IsString()
  @Length(13, 13)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: '0703',
  })
  @IsString()
  @IsNotEmpty()
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
    example: RoleEnum.CLIENT,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: RoleEnum;
}
