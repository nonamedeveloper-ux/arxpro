import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';
import { ResData } from 'src/lib/resData';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { hashed } from 'src/lib/bcrypt';
import { UserNotFoundExseption } from './exception/user.exception';
import { ID } from 'src/common/types/Id.type';
import { ForgetPasswordDto } from './dto/forget_password.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly repository: UserRepository) {}

  async findAll(): Promise<ResData<UserEntity[]>> {
    const users = await this.repository.findAll();

    return new ResData<Array<UserEntity>>('get all users', 200, users);
  }

  async findOneById(id: ID): Promise<ResData<UserEntity>> {
    const foundUser = await this.repository.findOneById(id);

    if (!foundUser) {
      throw new UserNotFoundExseption();
    }

    return new ResData<UserEntity>('get by id user', 200, foundUser);
  }
  async findOne(id: ID): Promise<ResData<UserEntity>> {
    const foundUser = await this.repository.findOne(id);

    if (!foundUser) {
      throw new UserNotFoundExseption();
    }

    return new ResData<UserEntity>('get by id user', 200, foundUser);
  }

  async findOneByPhone(phone: string): Promise<ResData<UserEntity>> {
    const foundPhone = await this.repository.findOneByPhone(phone);

    const resData = new ResData<UserEntity>('get by phone', 200, foundPhone);

    if (!foundPhone) {
      resData.message = 'Not Found';
      resData.statusCode = 404;
    }

    return resData;
  }

  async findOneByNickName(nickName: string): Promise<ResData<UserEntity>> {
    const foundPhone = await this.repository.findOneByNickName(nickName);

    const resData = new ResData<UserEntity>('get by nickName', 200, foundPhone);

    if (!foundPhone) {
      resData.message = 'Not Found';
      resData.statusCode = 404;
    }

    return resData;
  }

  async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
    const newData = new UserEntity();

    Object.assign(newData, dto);

    newData.password = await hashed(dto.password);

    const newUser = await this.repository.insert(newData);

    return new ResData<UserEntity>('created', 200, newUser);
  }

  async updated(dto: UpdateUserDto, id: ID): Promise<ResData<UserEntity>> {
    if (dto.password) {
      dto.password = await hashed(dto.password);
    }

    const foundUser = await this.repository.findOneById(id);

    if (!foundUser) {
      throw new UserNotFoundExseption();
    }

    const newUser = Object.assign(foundUser, dto);

    const updateUser = await this.repository.update(newUser);

    return new ResData('updated', 201, updateUser);
  }

  async forgetPassword(dto: ForgetPasswordDto): Promise<ResData<UserEntity>> {
    dto.password = await hashed(dto.password);

    const foundUser = await this.repository.findOneByPhone(dto.phone);

    if (!foundUser) {
      throw new UserNotFoundExseption();
    }

    const newUser = Object.assign(foundUser, dto);

    const updateUser = await this.repository.update(newUser);

    return new ResData('updated', 201, updateUser);
  }

  async delete(id: ID): Promise<ResData<UserEntity>> {
    const foundUser = await this.repository.findOneById(id);

    if (!foundUser) {
      throw new UserNotFoundExseption();
    }

    await this.repository.delete(id);

    return new ResData<UserEntity>('deleted', 200, foundUser);
  }
}
