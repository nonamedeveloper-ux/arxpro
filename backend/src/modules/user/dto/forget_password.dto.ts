import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgetPasswordDto {
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
}
