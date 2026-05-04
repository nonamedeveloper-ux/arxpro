import { ID } from '../../../common/types/Id.type';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

export interface ICommentRepository {
  // getCommentsByPostId(postId: ID): Promise<Array<any>>;
  findOneById(id: ID): Promise<CommentEntity>;
  insert(dto: CreateCommentDto): Promise<CommentEntity>;
  update(dto: UpdateCommentDto): Promise<CommentEntity>;
  delete(id: ID): void;
}
