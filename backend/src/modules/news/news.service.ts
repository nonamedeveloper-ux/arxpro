import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { INewsService } from './interfaces/news.service';
import { ResData } from 'src/lib/resData';
import { NewsEntity } from './entities/news.entity';
import { NewsRepository } from './news.repository';
import { NewsNotFoundException } from './exception/news.exception';

@Injectable()
export class NewsService implements INewsService {
  constructor(private readonly repository: NewsRepository) {}

  async findAll(): Promise<ResData<NewsEntity[]>> {
    const news = await this.repository.findAll();

    return new ResData<Array<NewsEntity>>('get all news', 200, news);
  }

  async findOneById(id: string): Promise<ResData<NewsEntity>> {
    const foundNew = await this.repository.findOneById(id);

    if (!foundNew) {
      throw new NewsNotFoundException();
    }

    const viewsCount = +foundNew.viewsCount;

    const dto = { viewsCount: viewsCount + 1 };

    const newData = Object.assign(foundNew, dto);

    await this.repository.update(newData);

    return new ResData<NewsEntity>('get one by id new', 200, foundNew);
  }

  async create(dto: CreateNewsDto): Promise<ResData<NewsEntity>> {
    const data = new NewsEntity();

    Object.assign(data, dto);

    const newData = await this.repository.insert(data);

    return new ResData<NewsEntity>('created', 201, newData);
  }

  async updated(dto: UpdateNewsDto, id: string): Promise<ResData<NewsEntity>> {
    const foundNew = await this.repository.findOneById(id);

    if (!foundNew) {
      throw new NewsNotFoundException();
    }

    console.log('dto', dto);

    const newData = Object.assign(foundNew, dto);

    const updateUser = await this.repository.update(newData);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: string): Promise<ResData<NewsEntity>> {
    const foundNew = await this.repository.findOneById(id);

    if (!foundNew) {
      throw new NewsNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData('deleted', 204, foundNew);
  }
}
