import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
  UploadedFiles,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileOption, fileOptionVideo } from '../../lib/file';
import { CreateFileDto } from './dto/create-file.dto';
import { ID } from 'src/common/types/Id.type';
import { FileService } from './files.service';
import { config } from '../../common/config/typeorm.config';
import { ProjectService } from '../project/project.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly projectService: ProjectService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload-one-image')
  @UseInterceptors(FileInterceptor('file', fileOption))
  async uploadFile(
    @Body() dto: CreateFileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: config.imageSize }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileService.create(file, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('multiupload-image')
  @UseInterceptors(FilesInterceptor('files', config.imageCount, fileOption))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: config.imageSize }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() dto: CreateFileDto,
  ) {
    return await this.fileService.createMultiple(files, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload-one-video')
  @UseInterceptors(FileInterceptor('file', fileOptionVideo))
  async uploadFileVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: config.videoSize }),
          new FileTypeValidator({ fileType: 'video/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    return await this.fileService.create(file, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.fileService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.fileService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: ID) {
    return await this.fileService.delete(id);
  }
}
