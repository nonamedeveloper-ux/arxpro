import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDescriptionDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  aboutUsDescription: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  projectsDescription: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  happyCustomerDescription: string;

  @ApiProperty({
    example: ``,
    type: String,
  })
  @IsString()
  ourArchitektorDescription: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  subscribeDescription: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  statisticDescription: string;

  @ApiProperty({
    type: String,
    example: '',
  })
  @IsString()
  @IsOptional()
  plansDescription: string;
}
