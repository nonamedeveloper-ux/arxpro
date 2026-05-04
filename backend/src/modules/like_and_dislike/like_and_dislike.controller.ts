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
import { LikeAndDislikeService } from './like_and_dislike.service';
import { CreateLikeAndDislikeDto } from './dto/create-like_and_dislike.dto';
import { UpdateLikeAndDislikeDto } from './dto/update-like_and_dislike.dto';
import { ArchitektorService } from '../architektor/architektor.service';
import { ProjectService } from '../project/project.service';
import { ID } from '../../common/types/Id.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('like_and_dislike')
@Controller('like-and-dislike')
export class LikeAndDislikeController {
  constructor(
    private readonly likeAndDislikeService: LikeAndDislikeService,
    private readonly architektorService: ArchitektorService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  async create(@Body() createLikeAndDislikeDto: CreateLikeAndDislikeDto) {
    if (createLikeAndDislikeDto.architektorId) {
      await this.architektorService.findOneById(
        createLikeAndDislikeDto.architektorId,
      );
    }

    if (createLikeAndDislikeDto.projectId) {
      await this.projectService.findOneById(createLikeAndDislikeDto.projectId);
    }

    return this.likeAndDislikeService.create(createLikeAndDislikeDto);
  }

  @Get()
  async findAll() {
    return this.likeAndDislikeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return this.likeAndDislikeService.findOneById(id);
  }

  @Get(':architektorId')
  async findOneArxId(@Param('architektorId', ParseUUIDPipe) arxId: ID) {
    return this.likeAndDislikeService.findOneByArxId(arxId);
  }

  @Get(':projectId')
  async findOneProId(@Param('projectId', ParseUUIDPipe) proId: ID) {
    return this.likeAndDislikeService.findOneByProId(proId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: ID,
    @Body() updateLikeAndDislikeDto: UpdateLikeAndDislikeDto,
  ) {
    if (updateLikeAndDislikeDto.architektorId) {
      await this.architektorService.findOneById(
        updateLikeAndDislikeDto.architektorId,
      );
    }

    if (updateLikeAndDislikeDto.projectId) {
      await this.projectService.findOneById(updateLikeAndDislikeDto.projectId);
    }
    return this.likeAndDislikeService.updated(updateLikeAndDislikeDto, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: ID) {
    return this.likeAndDislikeService.delete(id);
  }
}
