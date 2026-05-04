import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class UpdateNewsDto {
  @ApiProperty({
    type: String,
    example: 'news',
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsOptional()
  subtitle: string;

  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: Number,
  })
  @IsOptional()
  viewsCount: number;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsOptional()
  fileId: ID;
}
