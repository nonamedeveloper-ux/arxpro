import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/Id.type';
import { LikeAndDislikeEntity } from '../entities/like_and_dislike.entity';
import { CreateLikeAndDislikeDto } from '../dto/create-like_and_dislike.dto';
import { UpdateLikeAndDislikeDto } from '../dto/update-like_and_dislike.dto';

export interface ILikeAndDislikeService {
  findAll(): Promise<ResData<Array<LikeAndDislikeEntity>>>;
  findOneById(id: ID): Promise<ResData<LikeAndDislikeEntity | undefined>>;
  findOneByArxId(
    arxId: ID,
  ): Promise<ResData<Array<LikeAndDislikeEntity | undefined>>>;
  findOneByProId(
    proId: ID,
  ): Promise<ResData<Array<LikeAndDislikeEntity | undefined>>>;
  create(dto: CreateLikeAndDislikeDto): Promise<ResData<LikeAndDislikeEntity>>;
  updated(
    dto: UpdateLikeAndDislikeDto,
    id: ID,
  ): Promise<ResData<LikeAndDislikeEntity>>;
  delete(id: ID): Promise<ResData<LikeAndDislikeEntity | undefined>>;
}
