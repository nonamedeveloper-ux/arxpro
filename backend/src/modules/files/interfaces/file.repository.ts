import { ID } from 'src/common/types/Id.type';
import { FileEntity } from '../entities/file.entity';

export interface IFileRepository {
  findAll(): Promise<FileEntity[]>;
  findOneById(id: ID): Promise<FileEntity>;
  findOneFilePath(path: string): Promise<Array<FileEntity>>;
  findOneByProjectId(id: ID): Promise<FileEntity[]>;
  create(file: FileEntity): Promise<FileEntity>;
  delete(id: ID): Promise<FileEntity>;
  createMultiple(files: Array<FileEntity>): Promise<FileEntity[]>;
}
