import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegionService } from '../region/region.service';
import { ID } from 'src/common/types/Id.type';
import { Auth } from '../auth/decorator/auth.decorator';
import { RoleEnum } from '../../common/enums/enum';

@ApiTags('district')
@Controller('district')
export class DistrictController {
  constructor(
    private readonly districtService: DistrictService,
    private readonly regionService: RegionService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    await this.regionService.findOneById(createDistrictDto.regionId);

    return this.districtService.create(createDistrictDto);
  }

  @Get()
  async findAll() {
    return await this.districtService.findAll();
  }

  @Get(':regionId')
  async findByRegionId(@Param('regionId', ParseUUIDPipe) regionId: ID) {
    return await this.districtService.findOneByRegionId(regionId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.districtService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    await this.regionService.findOneById(updateDistrictDto.regionId);

    return this.districtService.updated(updateDistrictDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.districtService.delete(id);
  }
}
