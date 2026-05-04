import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './files.repository';
import { ResData } from 'src/lib/resData';
import {
  FileNotFound,
  FilePathNotFound,
  ImageCountExceededException,
} from './exceptions/file.exception';
import { unlink } from 'fs';
import { ID } from 'src/common/types/Id.type';
import { IFileService } from './interfaces/file.service';
import { config } from '../../common/config/typeorm.config';

@Injectable()
export class FileService implements IFileService {
  constructor(private readonly fileRepository: FileRepository) {}
  async create(
    file: Express.Multer.File,
    createFileDto: CreateFileDto,
  ): Promise<ResData<FileEntity>> {
    const insertFIle = new FileEntity();
    if (createFileDto.projectsId) {
      insertFIle.projectsId = createFileDto.projectsId;
    }

    insertFIle.filePath = file.path;
    insertFIle.mimetype = file.mimetype;
    insertFIle.size = file.size;

    const created = await this.fileRepository.create(insertFIle);

    return new ResData<FileEntity>('file created', 201, created);
  }

  async createMultiple(
    files: Array<Express.Multer.File>,
    createFileDto: CreateFileDto,
  ): Promise<ResData<FileEntity[]>> {
    const newFiles = [];

    if (files.length > config.imageCount) {
      throw new ImageCountExceededException();
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const insertFile = new FileEntity();

      insertFile.filePath = file.path;
      insertFile.projectsId = createFileDto.projectsId;
      insertFile.name = file.originalname;
      insertFile.mimetype = file.mimetype;
      insertFile.size = file.size;

      newFiles.push(insertFile);
    }

    const created = await this.fileRepository.createMultiple(newFiles);

    return new ResData<Array<FileEntity>>('files created', 201, created);
  }

  async findAll(): Promise<ResData<FileEntity[]>> {
    const categories = await this.fileRepository.findAll();

    return new ResData('get all files', 200, categories);
  }

  async findOneById(id: ID): Promise<ResData<FileEntity | undefined>> {
    const foundFile = await this.fileRepository.findOneById(id);

    if (!foundFile) {
      throw new FileNotFound();
    }

    return new ResData('get by id file', 200, foundFile);
  }

  async findOneFilePath(
    path: string,
  ): Promise<ResData<Array<FileEntity | undefined>>> {
    const foundFile = await this.fileRepository.findOneFilePath(path);

    if (!foundFile) {
      throw new FilePathNotFound();
    }

    return new ResData('get by id file', 200, foundFile);
  }

  async delete(id: ID): Promise<ResData<FileEntity>> {
    const foundFile = await this.fileRepository.findOneById(id);

    if (!foundFile) {
      throw new FileNotFound();
    }

    if (foundFile.filePath) {
      unlink(`${foundFile.filePath}`, (err) => {
        if (err) throw err;
      });
    }

    await this.fileRepository.delete(id);

    return new ResData('deleted', 204, foundFile);
  }

  async findOneByProjectId(id: ID): Promise<ResData<FileEntity[]>> {
    const files = await this.fileRepository.findOneByProjectId(id);

    return new ResData<FileEntity[]>('get all', 200, files);
  }
}
