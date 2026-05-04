import { ResData } from '../../../lib/resData';
import { ID } from '../../../common/types/Id.type';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

export interface ICommentService {
  // findAll(postId: ID): Promise<ResData<Array<CommentEntity>>>;
  findOneById(id: ID): Promise<ResData<CommentEntity>>;
  insert(data: CreateCommentDto): Promise<ResData<CommentEntity>>;
  update(dto: UpdateCommentDto, id: ID): Promise<ResData<CommentEntity>>;
  delete(id: ID): Promise<ResData<CommentEntity>>;
}
