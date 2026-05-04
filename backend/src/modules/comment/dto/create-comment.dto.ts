import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the post to which this comment belongs',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a top-level comment',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'The ID of the parent comment if this is a reply',
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    description: 'The ID of the author of the comment',
    example: 'userId123',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'The ID of the author of the comment',
    example: 'userId123',
  })
  @IsOptional()
  @IsUUID()
  architektorId?: string;
}
