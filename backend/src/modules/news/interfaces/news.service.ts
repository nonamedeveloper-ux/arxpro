import { ResData } from 'src/lib/resData';
import { NewsEntity } from '../entities/news.entity';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

export interface INewsService {
  findAll(): Promise<ResData<Array<NewsEntity>>>;
  findOneById(id: string): Promise<ResData<NewsEntity | undefined>>;
  create(dto: CreateNewsDto): Promise<ResData<NewsEntity>>;
  updated(dto: UpdateNewsDto, id: string): Promise<ResData<NewsEntity>>;
  delete(id: string): Promise<ResData<NewsEntity | undefined>>;
}
