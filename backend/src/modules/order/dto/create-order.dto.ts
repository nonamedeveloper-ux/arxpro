import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ID } from 'src/common/types/Id.type';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-of-project' })
  @IsUUID()
  @IsNotEmpty()
  projectId: ID;
}
