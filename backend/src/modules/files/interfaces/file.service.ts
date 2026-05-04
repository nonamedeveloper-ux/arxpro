import { ResData } from 'src/lib/resData';
import { FileEntity } from '../entities/file.entity';
import { CreateFileDto } from '../dto/create-file.dto';
import { ID } from 'src/common/types/Id.type';

export interface IFileService {
  findAll(): Promise<ResData<FileEntity[]>>;
  findOneById(id: ID): Promise<ResData<FileEntity>>;
  findOneFilePath(path: string): Promise<ResData<Array<FileEntity>>>;
  findOneByProjectId(id: ID): Promise<ResData<FileEntity[]>>;
  create(
    file: Express.Multer.File,
    createFileDto: CreateFileDto,
  ): Promise<ResData<FileEntity>>;
  createMultiple(
    file: Array<Express.Multer.File>,
    createFileDto: CreateFileDto,
  ): Promise<ResData<FileEntity[]>>;
  delete(id: ID): Promise<ResData<FileEntity>>;
}
