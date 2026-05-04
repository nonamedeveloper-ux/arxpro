import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { Repository } from 'typeorm';
import { INewsRepository } from './interfaces/news.repository';
import { UpdateNewsDto } from './dto/update-news.dto';

export class NewsRepository implements INewsRepository {
  constructor(
    @InjectRepository(NewsEntity) private repository: Repository<NewsEntity>,
  ) {}
  async findAll(): Promise<Array<NewsEntity>> {
    const news = await this.repository.find({ relations: ['file'] });

    return news.map((item) => ({
      ...item,
      filePath: item.file?.filePath || null, // Safely access the file path
    }));
  }

  async findOneById(id: string): Promise<NewsEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: NewsEntity): Promise<NewsEntity> {
    const newNews = this.repository.create(entity);

    await this.repository.save(newNews);

    return newNews;
  }

  async update(dto: UpdateNewsDto): Promise<NewsEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
