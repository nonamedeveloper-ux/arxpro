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
import { HomeTitleService } from './home-title.service';
import { CreateHomeTitleDto } from './dto/create-home-title.dto';
import { UpdateHomeTitleDto } from './dto/update-home-title.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from '../files/files.service';
import { RoleEnum } from '../../common/enums/enum';
import { Auth } from '../auth/decorator/auth.decorator';
import { ID } from '../../common/types/Id.type';

@ApiTags('home-title')
@Controller('home-title')
export class HomeTitleController {
  constructor(
    private readonly homeTitleService: HomeTitleService,
    private readonly fileService: FileService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createHomeTitleDto: CreateHomeTitleDto) {
    await this.fileService.findOneById(createHomeTitleDto.fileId);

    return this.homeTitleService.create(createHomeTitleDto);
  }

  @Get()
  async findAll() {
    const titles = await this.homeTitleService.findAll();

    for (let i = 0; i < titles.data.length; i++) {
      const foundData = await this.fileService.findOneById(
        titles.data[i].fileId,
      );

      titles.data[i].filePath = foundData.data.filePath;
    }

    return titles;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.homeTitleService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateHomeTitleDto: UpdateHomeTitleDto,
  ) {
    await this.fileService.findOneById(updateHomeTitleDto.fileId);

    return this.homeTitleService.updated(updateHomeTitleDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.homeTitleService.delete(id);
  }
}
