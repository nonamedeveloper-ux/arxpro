import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class CreateHomeTitleDto {
  @ApiProperty({
    type: String,
    example: 'text',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example: 'text',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  fileId: ID;
}
