import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectDto } from './dto/filter-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { ID } from '../../common/types/Id.type';
import { ArchitektorService } from '../architektor/architektor.service';
import { RoleEnum } from '../../common/enums/enum';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly architektorService: ArchitektorService,
  ) {}

  @Auth(RoleEnum.ARCHITECT, RoleEnum.ADMIN)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    console.log(1);
    await this.architektorService.findOneById(createProjectDto.architektorId);

    return await this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(@Query() filter: FilterProjectDto) {
    return await this.projectService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.projectService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.ARCHITECT)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    if (updateProjectDto.architektorId) {
    await this.architektorService.findOneById(updateProjectDto.architektorId);
    }

    return await this.projectService.updated(updateProjectDto, id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.ARCHITECT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: ID) {
    return this.projectService.delete(id);
  }
}
