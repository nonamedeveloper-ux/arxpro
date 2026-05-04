import { ID } from 'src/common/types/Id.type';
import { LikeAndDislikeEntity } from '../entities/like_and_dislike.entity';
import { CreateLikeAndDislikeDto } from '../dto/create-like_and_dislike.dto';
import { UpdateLikeAndDislikeDto } from '../dto/update-like_and_dislike.dto';

export interface ILikeAndDislikeRepository {
  findAll(): Promise<Array<LikeAndDislikeEntity>>;
  findOneById(id: ID): Promise<LikeAndDislikeEntity | undefined>;
  findOneByArxId(arxId: ID): Promise<Array<LikeAndDislikeEntity | undefined>>;
  findOneByProId(proId: ID): Promise<Array<LikeAndDislikeEntity | undefined>>;
  insert(dto: CreateLikeAndDislikeDto): Promise<LikeAndDislikeEntity>;
  update(dto: UpdateLikeAndDislikeDto): Promise<LikeAndDislikeEntity>;
  delete(id: ID): void;
}
