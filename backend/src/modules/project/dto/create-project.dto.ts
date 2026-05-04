import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ID } from 'src/common/types/Id.type';

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    example: '10',
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    type: String,
    example: 'area',
  })
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty({
    type: Number,
    example: 125000,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    example: '#hause #ofice',
  })
  @IsString()
  @IsNotEmpty()
  tegs: string;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  architektorId: ID;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  projectVideoId: ID;

  @ApiProperty({
    type: String,
    example: ['uuid', 'uuid'],
  })
  @IsNotEmpty()
  projectImageId: Array<string>;
}
