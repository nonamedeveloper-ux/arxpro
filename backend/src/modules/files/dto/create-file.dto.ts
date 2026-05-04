import { IsOptional, IsUUID } from 'class-validator';
import { ID } from '../../../common/types/Id.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsUUID()
  @IsOptional()
  projectsId: ID;
}
