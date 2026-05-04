import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

const Role = [RoleEnum.ARCHITEKTOR, RoleEnum.USER];

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    minLength: 13,
    maxLength: 13,
    example: '+998991853703',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 16,
    example: 'admin_07',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, {
    message: 'Password must be between 6 and 16 characters long',
  })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @Length(3, 50, {
    message: 'First Name must be between 3 and 50 characters long',
  })
  nickName: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 13,
    maxLength: 13,
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    minLength: 6,
    maxLength: 16,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, {
    message: 'Password must be between 6 and 16 characters long',
  })
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Role,
    example: RoleEnum.USER,
  })
  @IsOptional()
  @IsEnum(Role)
  role: RoleEnum;
}
