import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserMessageDto {
  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    example: '@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: '@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
