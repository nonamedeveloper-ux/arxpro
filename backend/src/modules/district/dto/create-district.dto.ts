import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/types/Id.type';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    type: String,
    example: "Bulung'ur",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  regionId: ID;
}
