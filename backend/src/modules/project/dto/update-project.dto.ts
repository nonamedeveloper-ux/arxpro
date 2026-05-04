import { CreateProjectDto } from './create-project.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ID } from "../../../common/types/Id.type";

export class UpdateProjectDto extends CreateProjectDto {
  @ApiProperty({
    type: String,
    example: '10',
  })
  @IsOptional()
  size: string;

  @ApiProperty({
    type: String,
    example: 'area',
  })
  @IsString()
  @IsOptional()
  area: string;

  @ApiProperty({
    type: Number,
    example: 125000,
  })
  @IsInt()
  @IsOptional()
  price: number;

  @ApiProperty({
    type: String,
    example: '#hause #ofice',
  })
  @IsString()
  @IsOptional()
  tegs: string;

  @ApiProperty({type: Number, example: 1})
  @IsOptional()
  viewsCount: number;

  @ApiProperty({type: Boolean, example: true})
  @IsOptional()
  IsTop: boolean

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  architektorId: ID;

  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  projectVideoId: ID;

  @ApiProperty({
    type: String,
    example: ['uuid', 'uuid'],
  })
  @IsOptional()
  projectImageId: Array<string>;
}
