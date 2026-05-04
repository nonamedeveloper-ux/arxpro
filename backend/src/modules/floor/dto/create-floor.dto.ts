import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class CreateFloorDto {
  @ApiProperty({
    type: JSON,
    example: {},
  })
  @IsNotEmpty()
  floorData: any;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: ID;
}
