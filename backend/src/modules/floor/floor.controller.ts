import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../project/project.service';
import { ID } from '../../common/types/Id.type';
import { raw } from "express";

@ApiTags('floor')
@Controller('floor')
export class FloorController {
  constructor(
    private readonly floorService: FloorService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(@Body() createFloorDto: CreateFloorDto) {
    await this.projectService.findOneById(createFloorDto.projectId);

    return this.floorService.create(createFloorDto);
  }

  @Get()
  findAll() {
    return this.floorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.floorService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateFloorDto: UpdateFloorDto,
  ) {
    await this.projectService.findOneById(updateFloorDto.projectId)

    return this.floorService.updated(updateFloorDto, id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.floorService.delete(id);
  }
}
