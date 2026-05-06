import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { IProjectRepository } from './interfaces/project.repository';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ID } from "../../common/types/Id.type";

export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private repository: Repository<ProjectEntity>,
  ) {}
  async findAll(filter?: FilterProjectDto): Promise<Array<ProjectEntity>> {
    let whereClause = 'WHERE 1=1';
    const params = [];

    if (filter?.minPrice) {
      params.push(filter.minPrice);
      whereClause += ` AND p.price >= $${params.length}`;
    }
    if (filter?.maxPrice) {
      params.push(filter.maxPrice);
      whereClause += ` AND p.price <= $${params.length}`;
    }
    if (filter?.search) {
      params.push(`%${filter.search}%`);
      whereClause += ` AND (p.size ILIKE $${params.length} OR p.teg ILIKE $${params.length})`;
    }

    const query = `
      SELECT
        p.id,
        p.name,
        p.price,
        p.teg,
        p.project_image_id AS "projectImageId",
        f.file_path AS "projectImagePath"
      FROM
        projects p
      LEFT JOIN
        LATERAL (SELECT file_path FROM files WHERE id = (SELECT jsonb_array_elements_text(p.project_image_id)::uuid LIMIT 1)) f ON TRUE
      ${whereClause};
    `;

    return await this.repository.query(query, params);
  }

  async findMaxNumber(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('projects')
      .select('MAX(projects.name)', 'max')
      .getRawOne();

    return result.max;
  }

  async findId(id: ID): Promise<ProjectEntity> {
    return await this.repository.findOneBy({ id: id });
  }

  async findOneById(id: string): Promise<any> {
    const result = await this.repository.query(
      `
   SELECT
    p.*,
    f_floor.floor_data as "floor_data",
    (SELECT jsonb_agg(f_image.file_path)
     FROM files f_image
     WHERE f_image.id IN (
        SELECT value::uuid
        FROM jsonb_array_elements_text(p.project_image_id)
      )
    ) as "project_image_path",
    f_video.file_path as "project_video_path"
  FROM
    projects p
  LEFT JOIN
    floor_data f_floor ON f_floor.project_id = p.id
  LEFT JOIN
    files f_video ON f_video.id = p.project_video_id::uuid
  WHERE
    p.id::uuid = $1
  GROUP BY
    p.id,
    f_floor.floor_data,
    f_video.file_path
`,
      [id],
    );

    return result;
  }

  async insert(entity: ProjectEntity): Promise<ProjectEntity> {
    const newProject = this.repository.create(entity);

    await this.repository.save(newProject);

    return newProject;
  }

  async update(dto: UpdateProjectDto): Promise<ProjectEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
