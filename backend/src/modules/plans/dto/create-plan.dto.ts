import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    type: String,
    example: 'BASIC',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    example: '20000',
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    example: '200000',
  })
  @IsInt()
  @IsNotEmpty()
  yearPrice: number;

  @ApiProperty({
    type: String,
    example: 'Ability to upload up to 3 projects.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    example:
      'Thank you for the fastest service ever, liked how everything in the house was ready on time in the house was ready on time.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

// name string
// price number
// year_price number
// title string
// description string
