import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SentSmsDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+998991853703',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'name',
  })
  @IsString()
  @IsOptional()
  nickName: string;
}
