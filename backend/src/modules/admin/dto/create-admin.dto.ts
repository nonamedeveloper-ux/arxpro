import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ID } from '../../../common/types/Id.type';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    example: 'Oxunjon',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Xatamov',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: ID;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  fileId: ID;
}

// id uuid [primary key] +
// first_name varchar +
// last_name varchar +
// user_id uuid [ref: - users.id] +
// file_id uuid [ref: - files.id] +
// created_at timestamp +
// updated_at timestamp +
