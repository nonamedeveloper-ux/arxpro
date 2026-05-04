import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class CreateLikeAndDislikeDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  like: number;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsInt()
  @IsOptional()
  dislike: number;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsString()
  @IsOptional()
  architektorId: ID;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsString()
  @IsOptional()
  projectId: ID;
}
