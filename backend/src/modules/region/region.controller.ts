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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ID } from 'src/common/types/Id.type';
import { RoleEnum } from '../../common/enums/enum';
import { Auth } from '../auth/decorator/auth.decorator';
import { RolesGuard } from '../shared/guards/role.guard';
import { AuthGuard } from '../shared/guards/auth.guard';

@ApiTags('region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionService.create(createRegionDto);
  }

  @Get()
  async findAll() {
    return await this.regionService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.regionService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return await this.regionService.updated(updateRegionDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.regionService.delete(id);
  }
}
