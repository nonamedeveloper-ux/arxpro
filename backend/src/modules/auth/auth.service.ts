import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './interfaces/auth.service';
import { ResData } from '../../lib/resData';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import {
  LoginOrPasswordWrongException,
  NickNameIsNotException,
  UserEmailSuchExseption,
  UserPhoneSuchExseption,
} from './exception/auth.exception';
import { compar, hashed } from '../../lib/bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { generateRandomNumber } from '../../lib/generateCode';
import { MailService } from '../../lib/mailService';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { Cache } from 'cache-manager';
import { config } from '../../common/config/typeorm.config';
import { SendOtpDto } from './dto/sendOtp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const foundUser = await this.userRepository.findOneByEmail(dto.email);
    if (!foundUser) {
      throw new LoginOrPasswordWrongException();
    }

    const comparedPassword = await compar(dto.password, foundUser.password);
    if (!comparedPassword) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync(
      { id: foundUser.id, role: foundUser.role },
      {
        secret: config.jwtSecretKey,
        expiresIn: config.jwtExpiredIn,
      },
    );

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: CreateUserDto): Promise<ResData<ILoginData>> {
    const foundUser = await this.userRepository.findOneByEmail(dto.email);

    if (foundUser) {
      throw new UserEmailSuchExseption();
    }

    if (dto.phone) {
      const foundPhone = await this.userRepository.findOneByPhone(dto.phone);
      if (foundPhone) {
        throw new UserPhoneSuchExseption();
      }
    }

    if (dto.nickName) {
      const foundNickName = await this.userRepository.findOneByNickName(
        dto.nickName,
      );
      if (foundNickName) {
        throw new NickNameIsNotException();
      }
    }

    dto.password = await hashed(dto.password);
    const newUser = new UserEntity();
    newUser.phone = dto.phone;

    const newData = Object.assign(newUser, dto);

    const created = await this.userRepository.insert(newData);

    const token = await this.jwtService.signAsync(
      { id: created.id, role: created.role },
      {
        secret: config.jwtSecretKey,
        expiresIn: config.jwtExpiredIn,
      },
    );

    return new ResData<ILoginData>('success', HttpStatus.CREATED, {
      user: created,
      token,
    });
  }

  async sendOtp(dto: SendOtpDto) {
    const generateCode = generateRandomNumber(6);
    if (dto.nickName) {
      const foundUser = await this.userRepository.findOneByNickName(
        dto.nickName,
      );
      if (foundUser) {
        throw new NickNameIsNotException();
      }
    }

    await this.mailService.sendOtp(dto.email, String(generateCode));

    await this.cacheManager.set(dto.email, generateCode, 120000);
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<ResData<boolean>> {
    // For development: Accept any code
    const checked = true;

    return new ResData<boolean>('Verify OTP code', 200, checked);
  }
}
