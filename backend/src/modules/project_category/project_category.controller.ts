import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectCategoryService } from './project_category.service';
import { CreateProjectCategoryDto } from './dto/create-project_category.dto';
import { UpdateProjectCategoryDto } from './dto/update-project_category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/Id.type';
import { Auth } from '../auth/decorator/auth.decorator';
import { RoleEnum } from '../../common/enums/enum';
import { RolesGuard } from '../shared/guards/role.guard';
import { AuthGuard } from '../shared/guards/auth.guard';

@ApiTags('project_category')
@Controller('project-category')
export class ProjectCategoryController {
  constructor(
    private readonly projectCategoryService: ProjectCategoryService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  create(@Body() createProjectCategoryDto: CreateProjectCategoryDto) {
    return this.projectCategoryService.create(createProjectCategoryDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.projectCategoryService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.projectCategoryService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateProjectCategoryDto: UpdateProjectCategoryDto,
  ) {
    return this.projectCategoryService.updated(updateProjectCategoryDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: ID) {
    return this.projectCategoryService.delete(id);
  }
}
