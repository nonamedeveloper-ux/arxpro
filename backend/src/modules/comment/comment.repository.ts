import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../../common/types/Id.type';
import { CommentEntity } from './entities/comment.entity';
import { NotFoundException } from '@nestjs/common';
import { ICommentRepository } from './interfaces/comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  async findCommentsWithPagination(postId: string, page: number, limit: number): Promise<any> {
    const offset = (page - 1) * limit;

    try {
      const results = await this.repository.query(`
        WITH RECURSIVE comment_tree AS (
          SELECT
            c.id AS comment_id,
            c.content AS comment_content,
            c.created_at AS comment_created_at,
            c.last_update_at AS comment_last_update_at,
            c.parent_id AS comment_parent_id,

            -- User details
            u.id AS user_id,
            u.nick_name AS user_nick_name,
            COALESCE(f1.file_path, '') AS user_profile_image_id,

            -- Architektor details
            a.id AS architektor_id,
            a.nick_name AS architektor_nick_name,
            COALESCE(f2.file_path, '') AS architektor_profile_image_id

          FROM comments c
          LEFT JOIN users u ON c.user_id::uuid = u.id
          LEFT JOIN architektors a ON c.architektor_id::uuid = a.id
          LEFT JOIN files f1 ON u.profile_image_id::uuid = f1.id
          LEFT JOIN files f2 ON a.profile_image_id::uuid = f2.id
          WHERE c.post_id = $1 AND c.parent_id::uuid IS NULL

          UNION ALL

          SELECT
            c.id AS comment_id,
            c.content AS comment_content,
            c.created_at AS comment_created_at,
            c.last_update_at AS comment_last_update_at,
            c.parent_id AS comment_parent_id,

            -- User details
            u.id AS user_id,
            u.nick_name AS user_nick_name,
            COALESCE(f1.file_path, '') AS user_profile_image_id,

            -- Architektor details
            a.id AS architektor_id,
            a.nick_name AS architektor_nick_name,
            COALESCE(f2.file_path, '') AS architektor_profile_image_id

          FROM comments c
          JOIN comment_tree ct ON c.parent_id::uuid = ct.comment_id
          LEFT JOIN users u ON c.user_id::uuid = u.id
          LEFT JOIN architektors a ON c.architektor_id::uuid = a.id
          LEFT JOIN files f1 ON u.profile_image_id::uuid = f1.id
          LEFT JOIN files f2 ON a.profile_image_id::uuid = f2.id
        )
        SELECT
          ct.comment_id,
          ct.comment_content,
          ct.comment_created_at,
          ct.comment_last_update_at,
          ct.comment_parent_id,
          ct.user_id,
          ct.user_nick_name,
          ct.user_profile_image_id,
          ct.architektor_id,
          ct.architektor_nick_name,
          ct.architektor_profile_image_id
        FROM comment_tree ct
        WHERE ct.comment_created_at IS NOT NULL
        ORDER BY ct.comment_created_at DESC
        LIMIT $2 OFFSET $3
      `, [postId, limit, offset]);

      const totalCountResults = await this.repository.query(`
        SELECT COUNT(*) AS total_count
        FROM comments
        WHERE post_id = $1
      `, [postId]);

      // const totalCount = totalCountResults[0]?.total_count || 0;
      const totalCount = parseInt(totalCountResults[0]?.total_count, 10);
      const comments = results;

      return { totalCount, comments };
    } catch (error) {
      console.error('Error in repository query:', error);
      throw error;
    }
  }

  async findOneById(id: ID): Promise<CommentEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async insert(entity: CommentEntity): Promise<CommentEntity> {
    if (entity.parentId) {
      const parentComment = await this.repository.findOne({
        where: { id: entity.parentId },
      });
      if (!parentComment) {
        throw new NotFoundException(`Parent comment with ID not found`);
      }
      entity.parent = parentComment;
    }

    return await this.repository.save(entity);
  }

  async update(dto: UpdateCommentDto): Promise<CommentEntity> {
    return this.repository.save(dto);
  }

  async delete(id: ID) {
    const comment = await this.repository.findOne({
      where: { id },
      relations: ['replies'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id not found.`);
    }

    // Set parentId to null for all replies
    if (comment.replies.length > 0) {
      for (const reply of comment.replies) {
        reply.parentId = null;
        await this.repository.save(reply);
      }
    }

    await this.repository.remove(comment);
  }
}
