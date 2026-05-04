import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class CreateSubscriberDto {
  @ApiProperty({
    type: String,
    example: '@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: ID;
}
