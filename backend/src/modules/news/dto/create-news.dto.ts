import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'crypto';

export class CreateNewsDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsOptional()
  fileId: UUID;
}
