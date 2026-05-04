import { CreateFloorDto } from './create-floor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class UpdateFloorDto extends CreateFloorDto {
  @ApiProperty({
    type: JSON,
    example: {},
  })
  @IsOptional()
  floorData: any;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsOptional()
  projectId: ID;
}
