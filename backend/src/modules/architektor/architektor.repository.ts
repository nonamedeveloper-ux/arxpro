import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ArchitektorEntity } from './entities/architektor.entity';
import { IArchitektorRepository } from './interfaces/architektor.repository';
import { ID } from 'src/common/types/Id.type';
import { UpdateArchitektorDto } from './dto/update-architektor.dto';
import { EntityManager } from 'typeorm';

export class ArchitektorRepository implements IArchitektorRepository {
  constructor(
    @InjectRepository(ArchitektorEntity)
    private repository: Repository<ArchitektorEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async searchArchitects(
    category: string,
    nickName: string,
    region: string,
    page: number,
    size: number,
  ): Promise<any> {
    const query = `
    SELECT
      a.id,
      a.first_name AS "first_name",
      a.last_name AS "last_name",
      a.category,
      pf.file_path AS "profile_image_path",
      a.raiting AS "rating",
      d.name AS "district_name",
      r.name AS "region_name"
    FROM
      architektors a
    LEFT JOIN
      districts d ON a.district_id::uuid = d.id
    LEFT JOIN
      regions r ON d.region_id::uuid = r.id
    LEFT JOIN
      files pf ON a.profile_image_id::uuid = pf.id
    WHERE
      ($1::text IS NULL OR a.category ILIKE $1)
      AND ($2::text IS NULL OR a.nick_name ILIKE $2)
      AND ($3::text IS NULL OR r.name ILIKE $3)
    ORDER BY
      a.raiting DESC
    LIMIT $4 OFFSET $5
  `;

    const parameters = [
      category ? `%${category}%` : null,
      nickName ? `%${nickName}%` : null,
      region ? `%${region}%` : null,
      size,
      (page - 1) * size,
    ];

    const countQuery = `
    SELECT COUNT(DISTINCT a.id)
    FROM
      architektors a
    LEFT JOIN
      districts d ON a.district_id::uuid = d.id
    LEFT JOIN
      regions r ON d.region_id::uuid = r.id
    WHERE
      ($1::text IS NULL OR a.category ILIKE $1)
      AND ($2::text IS NULL OR a.nick_name ILIKE $2)
      AND ($3::text IS NULL OR r.name ILIKE $3)
  `;

    const countParameters = [
      category ? `%${category}%` : null,
      nickName ? `%${nickName}%` : null,
      region ? `%${region}%` : null,
    ];

    const [results, totalResult] = await Promise.all([
      this.entityManager.query(query, parameters),
      this.entityManager.query(countQuery, countParameters),
    ]);

    const total = parseInt(totalResult[0].count, 10);

    const formattedResults = results.map((result) => ({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      category: result.category,
      profile_image_path: result.profile_image_path?.replace(/\\/g, '/') ?? null,
      rating: result.rating,
      district: {
        name: result.district_name,
        region_name: result.region_name,
      },
    }));

    return {
      architects: formattedResults,
      total,
      page,
      size,
    };
  }

  async findAll(): Promise<Array<ArchitektorEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<any | undefined> {
    const result = await this.repository.query(
      `
    SELECT
      a.*,
      d.name as "districtName",
      r.name as "regionName",
      pf.file_path as "profileImagePath",
      bf.file_path as "backgroundImagePath"
    FROM
      architektors a
    LEFT JOIN
      districts d ON a.district_id::uuid = d.id
    LEFT JOIN
      regions r ON d.region_id::uuid = r.id
    LEFT JOIN
      files pf ON a.profile_image_id::uuid = pf.id
    LEFT JOIN
      files bf ON a.background_image_id::uuid = bf.id
    WHERE
      a.id::uuid = $1
  `,
      [id],
    );

    return result.map((architect) => ({
      id: architect.id,
      created_at: architect.created_at,
      last_update_at: architect.last_update_at,
      nick_name: architect.nick_name,
      first_name: architect.first_name,
      last_name: architect.last_name,
      middle_name: architect.middle_name,
      birth_date: architect.birth_date,
      about_me: architect.about_me,
      email: architect.email,
      user_id: architect.user_id,
      plan_id: architect.plan_id,
      profile_image_id: architect.profile_image_id,
      background_image_id: architect.background_image_id,
      profile_image_path: architect.profileImagePath?.replace(/\\/g, '/') ?? null,
      background_image_path: architect.backgroundImagePath?.replace(/\\/g, '/') ?? null,
      instagram: architect.instagram,
      telegram: architect.telegram,
      youtube: architect.youtube,
      tiktok: architect.tiktok,
      facebook: architect.facebook,
      rating: architect.raiting,
      category: architect.category,
      views_count: architect.views_count,
      is_top: architect.is_top,
      district_id: architect.district_id,
      district: {
        name: architect.districtName,
        region_name: architect.regionName,
      },
    }))[0];
  }

  async getTopArchitectsByRating() {
    const architects = await this.repository.query(
      `
  SELECT
    a.id,
    a.first_name AS "first_name",
    a.last_name AS "last_name",
    a.category,
    a.raiting AS "rating",
    pf.file_path AS "profile_image_path",
    d.name AS "district_name",
    r.name AS "region_name"
  FROM
    architektors a
  LEFT JOIN
    districts d ON a.district_id::uuid = d.id
  LEFT JOIN
    regions r ON d.region_id::uuid = r.id
  LEFT JOIN
    files pf ON a.profile_image_id::uuid = pf.id
  WHERE
    a.is_top = true
  ORDER BY
    a.raiting DESC
  LIMIT $1 OFFSET $2
`,
      [10, 0],
    );

    const formattedResults = architects.map((result) => ({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      category: result.category,
      profile_image_path: result.profile_image_path?.replace(/\\/g, '/') ?? null,
      rating: result.rating,
      district: {
        name: result.district_name,
        region_name: result.region_name,
      },
    }));

    return {
      architects: formattedResults,
      total: architects.length,
      page: 1,
      size: 10,
    };
  }

  async getUniqueCategories(): Promise<string[]> {
    // Using query builder to get unique categories
    const categories = await this.repository
      .createQueryBuilder('architect')
      .select('DISTINCT architect.category')
      .where('architect.category IS NOT NULL')
      .orderBy('architect.category', 'ASC')
      .getRawMany();

    // Extracting category values from the result
    return categories.map((item) => item.category);
  }

  async findOneByUserId(
    userId: ID,
  ): Promise<Array<ArchitektorEntity | undefined>> {
    const result = await this.repository.query(
      `
    SELECT
      a.*,
      d.name as "districtName",
      r.name as "regionName",
      pf.file_path as "profileImagePath",
      bf.file_path as "backgroundImagePath"
    FROM
      architektors a
    LEFT JOIN
      districts d ON a.district_id::uuid = d.id
    LEFT JOIN
      regions r ON d.region_id::uuid = r.id
    LEFT JOIN
      files pf ON a.profile_image_id::uuid = pf.id
    LEFT JOIN
      files bf ON a.background_image_id::uuid = bf.id
    WHERE
      a.user_id::uuid = $1
  `,
      [userId],
    );

    return result.map((architect) => ({
      id: architect.id,
      created_at: architect.created_at,
      last_update_at: architect.last_update_at,
      nick_name: architect.nick_name,
      first_name: architect.first_name,
      last_name: architect.last_name,
      middle_name: architect.middle_name,
      birth_date: architect.birth_date,
      about_me: architect.about_me,
      email: architect.email,
      user_id: architect.user_id,
      plan_id: architect.plan_id,
      profile_image_id: architect.profile_image_id,
      background_image_id: architect.background_image_id,
      profile_image_path: architect.profileImagePath,
      background_image_path: architect.backgroundImagePath,
      instagram: architect.instagram,
      telegram: architect.telegram,
      youtube: architect.youtube,
      tiktok: architect.tiktok,
      facebook: architect.facebook,
      rating: architect.raiting,
      views_count: architect.views_count,
      is_top: architect.is_top,
      category: architect.category,
      district_id: architect.district_id,
      district: {
        name: architect.districtName,
        region_name: architect.regionName,
      },
    }))[0];
  }

  async findOneByNickeName(nickName: string): Promise<ArchitektorEntity> {
    return await this.repository.findOneBy({ nickName });
  }

  async findUserId(userId: ID): Promise<ArchitektorEntity> {
    return await this.repository.findOneBy({ userId });
  }

  async insert(entity: ArchitektorEntity): Promise<ArchitektorEntity> {
    const newArchitektor = this.repository.create(entity);

    await this.repository.save(newArchitektor);

    return newArchitektor;
  }

  async update(dto: UpdateArchitektorDto): Promise<ArchitektorEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
