import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../../common/types/Id.type';
import { ILikeAndDislikeRepository } from './interfaces/like_and_dislike.repository';
import { LikeAndDislikeEntity } from './entities/like_and_dislike.entity';
import { UpdateLikeAndDislikeDto } from './dto/update-like_and_dislike.dto';

export class LikeAndDislikeRepository implements ILikeAndDislikeRepository {
  constructor(
    @InjectRepository(LikeAndDislikeEntity)
    private repository: Repository<LikeAndDislikeEntity>,
  ) {}
  async findAll(): Promise<Array<LikeAndDislikeEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<LikeAndDislikeEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByArxId(
    architektorId: ID,
  ): Promise<Array<LikeAndDislikeEntity | undefined>> {
    return await this.repository.find({ where: { architektorId } });
  }

  async findOneByProId(
    projectId: ID,
  ): Promise<Array<LikeAndDislikeEntity | undefined>> {
    return await this.repository.find({ where: { projectId } });
  }

  async insert(entity: LikeAndDislikeEntity): Promise<LikeAndDislikeEntity> {
    const newLikeAndDislike = this.repository.create(entity);

    await this.repository.save(newLikeAndDislike);

    return newLikeAndDislike;
  }

  async update(dto: UpdateLikeAndDislikeDto): Promise<LikeAndDislikeEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
