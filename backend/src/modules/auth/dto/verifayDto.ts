import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifayDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+998991853703',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
