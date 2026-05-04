import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe, Put
} from "@nestjs/common";
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ID } from 'src/common/types/Id.type';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../common/enums/enum';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.plansService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.plansService.updated(updatePlanDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.plansService.delete(id);
  }
}
