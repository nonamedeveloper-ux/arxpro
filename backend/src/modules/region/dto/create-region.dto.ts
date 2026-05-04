import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    type: String,
    example: 'Samarqand',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
