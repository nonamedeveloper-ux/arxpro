import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from '../files/files.service';
import { RoleEnum } from '../../common/enums/enum';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly fileService: FileService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    await this.fileService.findOneById(createNewsDto.fileId);
    return await this.newsService.create(createNewsDto);
  }

  @Get()
  async findAll() {
    return await this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.newsService.findOneById(id);
  }

  @Auth(RoleEnum.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    await this.fileService.findOneById(updateNewsDto.fileId);

    return await this.newsService.updated(updateNewsDto, id);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.newsService.delete(id);
  }
}
