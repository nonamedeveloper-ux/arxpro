import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { ID } from '../../common/types/Id.type';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { RoleEnum } from '../../common/enums/enum';

@ApiTags('description')
@Controller('description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.insert(createDescriptionDto);
  }

  @Get()
  findAll() {
    return this.descriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.descriptionService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.descriptionService.update(updateDescriptionDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.descriptionService.delete(id);
  }
}
