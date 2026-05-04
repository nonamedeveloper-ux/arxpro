import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a top-level comment',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;
}
