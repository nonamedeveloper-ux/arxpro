import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { IFileRepository } from './interfaces/file.repository';
import { ID } from 'src/common/types/Id.type';

export class FileRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async create(file: FileEntity): Promise<FileEntity> {
    return await this.fileRepository.save(file);
  }

  async createMultiple(files: Array<FileEntity>): Promise<Array<FileEntity>> {
    return await this.fileRepository.save(files);
  }

  async findAll(): Promise<FileEntity[]> {
    return await this.fileRepository.find();
  }

  async findOneById(id: ID): Promise<FileEntity | undefined> {
    return await this.fileRepository.findOneBy({ id });
  }

  async findOneFilePath(
    filePath: string,
  ): Promise<Array<FileEntity | undefined>> {
    return await this.fileRepository.find({ where: { filePath } });
  }

  async delete(id: ID): Promise<FileEntity | undefined> {
    const foundFile = await this.fileRepository.findOneBy({ id });
    await this.fileRepository.delete(id);
    return foundFile;
  }

  async findOneByProjectId(id: ID): Promise<FileEntity[]> {
    return await this.fileRepository.find({ where: { projectsId: id } });
  }
}
