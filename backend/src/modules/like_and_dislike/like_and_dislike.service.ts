import { Injectable } from '@nestjs/common';
import { CreateLikeAndDislikeDto } from './dto/create-like_and_dislike.dto';
import { UpdateLikeAndDislikeDto } from './dto/update-like_and_dislike.dto';
import { ILikeAndDislikeService } from './interfaces/like_and_dislike.service';
import { ResData } from '../../lib/resData';
import { LikeAndDislikeEntity } from './entities/like_and_dislike.entity';
import { ID } from '../../common/types/Id.type';
import { LikeAndDislikeRepository } from './like_and_dislike.repository';
import { LikeAndDislikeNotFoundException } from './exception/likeDislike.exception';

@Injectable()
export class LikeAndDislikeService implements ILikeAndDislikeService {
  constructor(private readonly repository: LikeAndDislikeRepository) {}
  async findAll(): Promise<ResData<Array<LikeAndDislikeEntity>>> {
    const getAllData = await this.repository.findAll();

    return new ResData<Array<LikeAndDislikeEntity>>(
      'get all data',
      200,
      getAllData,
    );
  }

  async findOneById(
    id: ID,
  ): Promise<ResData<LikeAndDislikeEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new LikeAndDislikeNotFoundException();
    }
    return new ResData<LikeAndDislikeEntity | undefined>(
      'get by id like or dislike',
      201,
      foundData,
    );
  }

  async findOneByArxId(
    id: ID,
  ): Promise<ResData<Array<LikeAndDislikeEntity | undefined>>> {
    const foundData = await this.repository.findOneByArxId(id);

    if (!foundData) {
      throw new LikeAndDislikeNotFoundException();
    }
    return new ResData<Array<LikeAndDislikeEntity | undefined>>(
      'get by architektor id like or dislike',
      201,
      foundData,
    );
  }

  async findOneByProId(
    proId: ID,
  ): Promise<ResData<Array<LikeAndDislikeEntity | undefined>>> {
    const foundData = await this.repository.findOneByProId(proId);

    if (!foundData) {
      throw new LikeAndDislikeNotFoundException();
    }
    return new ResData<Array<LikeAndDislikeEntity | undefined>>(
      'get by project id like or dislike',
      201,
      foundData,
    );
  }

  async create(
    dto: CreateLikeAndDislikeDto,
  ): Promise<ResData<LikeAndDislikeEntity>> {
    const likeEntity = new LikeAndDislikeEntity();

    Object.assign(likeEntity, dto);

    const createlike = await this.repository.insert(likeEntity);
    return new ResData<LikeAndDislikeEntity>('created', 201, createlike);
  }

  async updated(
    dto: UpdateLikeAndDislikeDto,
    id: ID,
  ): Promise<ResData<LikeAndDislikeEntity>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new LikeAndDislikeNotFoundException();
    }

    Object.assign(foundData, dto);

    const updateData = await this.repository.update(foundData);

    return new ResData<LikeAndDislikeEntity>('updated', 201, updateData);
  }

  async delete(id: ID): Promise<ResData<LikeAndDislikeEntity | undefined>> {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new LikeAndDislikeNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<LikeAndDislikeEntity>('delete', 200, foundData);
  }
}
