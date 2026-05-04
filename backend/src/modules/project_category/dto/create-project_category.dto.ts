import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Turar joy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
