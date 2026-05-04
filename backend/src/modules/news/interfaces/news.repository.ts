import { CreateNewsDto } from '../dto/create-news.dto';
import { NewsEntity } from '../entities/news.entity';

export interface INewsRepository {
  findAll(): Promise<Array<NewsEntity>>;
  findOneById(id: string): Promise<NewsEntity | undefined>;
  insert(dto: NewsEntity): Promise<NewsEntity>;
  update(dto: CreateNewsDto): Promise<NewsEntity>;
  delete(id: string): void;
}
