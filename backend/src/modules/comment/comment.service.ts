import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ICommentService } from './interfaces/comment.service';
import { ID } from '../../common/types/Id.type';
import { ResData } from '../../lib/resData';
import { CommentEntity } from './entities/comment.entity';
import { CommentNotFoundException } from './esception/comment.exception';

@Injectable()
export class CommentService implements ICommentService {
  constructor(private readonly repository: CommentRepository) {}

  async getCommentsByPostId(postId: string, page: number, limit: number) {
    try {
      const { totalCount, comments } =
        await this.repository.findCommentsWithPagination(postId, page, limit);

      // Helper function to structure comments
      function buildCommentTree(comment, allComments) {
        const replies = allComments
          .filter((c) => c.comment_parent_id === comment.comment_id)
          .map((c) => buildCommentTree(c, allComments));

        return {
          id: comment.comment_id,
          content: comment.comment_content,
          parentId: comment.comment_parent_id,
          createdAt: comment.comment_created_at,
          updatedAt: comment.comment_last_update_at,
          user: comment.user_id
            ? {
                id: comment.user_id,
                nickName: comment.user_nick_name,
                profileImagePath: comment.user_profile_image_id,
              }
            : null,
          architektor: comment.architektor_id
            ? {
                id: comment.architektor_id,
                nickName: comment.architektor_nick_name,
                profileImagePath: comment.architektor_profile_image_id,
              }
            : null,
          replies,
        };
      }

      const topLevelComments = comments
        .filter((comment) => comment.comment_parent_id === null)
        .map((comment) => buildCommentTree(comment, comments));

      return { comments: topLevelComments, totalCount, page, limit };
    } catch (error) {
      console.error('Error getting comments by post ID:', error);
      throw error;
    }
  }

  async findOneById(id: ID): Promise<ResData<CommentEntity>> {
    const foundComment = await this.repository.findOneById(id);

    if (!foundComment) {
      throw new CommentNotFoundException();
    }

    return new ResData<CommentEntity>('get by id comment', 200, foundComment);
  }

  async insert(dto: CreateCommentDto): Promise<ResData<CommentEntity>> {
    const newData = new CommentEntity();

    Object.assign(newData, dto);

    const data = await this.repository.insert(newData);

    return new ResData<CommentEntity>('created', 200, data);
  }

  async update(
    data: UpdateCommentDto,
    id: ID,
  ): Promise<ResData<CommentEntity>> {
    const foundComment = await this.repository.findOneById(id);

    if (!foundComment) {
      throw new CommentNotFoundException();
    }

    const newComment = Object.assign(foundComment, data);

    const updateComment = await this.repository.update(newComment);

    return new ResData('updated', 201, updateComment);
  }

  async delete(id: ID): Promise<ResData<CommentEntity>> {
    const foundComment = await this.repository.findOneById(id);

    if (!foundComment) {
      throw new CommentNotFoundException();
    }

    await this.repository.delete(id);

    return new ResData<CommentEntity>('delete', 201, foundComment);
  }
}
