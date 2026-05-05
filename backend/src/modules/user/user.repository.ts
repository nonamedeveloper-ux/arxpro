import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { ID } from 'src/common/types/Id.type';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Array<UserEntity>> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<any> {
    const result = await this.repository.query(
      `SELECT
      u.*,
      pf.file_path as "profileImagePath",
      bf.file_path as "backgroundImagePath"
    FROM
      users u
    LEFT JOIN
      files pf ON u.profile_image_id::uuid = pf.id
    LEFT JOIN
      files bf ON u.background_image_id::uuid = bf.id
    WHERE
      u.id::uuid = $1`,
      [id],
    );

    const mapped = result.map((user) => ({
      id: user.id,
      nickName: user.nick_name,
      firstName: user.first_name ? user.first_name : null,
      lastName: user.last_name ? user.last_name : null,
      middleName: user.middle_name ? user.middle_name : null,
      email: user.email ? user.email : null,
      phone: user.phone,
      role: user.role,
      profileImageId: user.profile_image_id ? user.profile_image_id : null,
      backgroundImageId: user.background_image_id
        ? user.background_image_id
        : null,

      profileImagePath: user.profileImagePath?.replace(/\\/g, '/') ?? null,

      backgroundImagePath: user.backgroundImagePath?.replace(/\\/g, '/') ?? null,

      createdAt: user.created_at,
      lastUpdateAt: user.last_update_at,
    }));

    return mapped[0];
  }

  async findOne(id: ID): Promise<any> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByPhone(phone: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ phone });
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ email });
  }

  async findOneByNickName(nickName: string): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ nickName });
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    const newUser = this.repository.create(entity);

    await this.repository.save(newUser);

    return newUser;
  }

  async update(dto: UpdateUserDto): Promise<UserEntity> {
    return await this.repository.save(dto);
  }

  async delete(id: ID) {
    return await this.repository.delete(id);
  }
}
