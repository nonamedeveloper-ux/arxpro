import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './interfaces/auth.service';
import { ResData } from '../../lib/resData';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import {
  LoginOrPasswordWrongException,
  NickNameIsNotException,
  UserPhoneSuchExseption,
} from './exception/auth.exception';
import { compar, hashed } from '../../lib/bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { generateRandomNumber } from '../../lib/generateCode';
import { SmsService } from '../../lib/smsService';
import { VerifayDto } from './dto/verifayDto';
import { Cache } from 'cache-manager';
import { config } from '../../common/config/typeorm.config';
import { SentSmsDto } from './dto/sentSms.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly smsService: SmsService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const foundUser = await this.userRepository.findOneByPhone(dto.phone);
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
    const foundUser = await this.userRepository.findOneByPhone(dto.phone);

    if (foundUser) {
      throw new UserPhoneSuchExseption();
    }
    dto.password = await hashed(dto.password);
    const newUser = new UserEntity();

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

  async sentSms(dto: SentSmsDto) {
    const generateCode = generateRandomNumber(6);
    if (dto.nickName) {
      const foundUser = await this.userRepository.findOneByNickName(
        dto.nickName,
      );
      if (foundUser) {
        throw new NickNameIsNotException();
      }
    }

    const message = `ArxPro platformasida ro‘yhatdan o‘tish uchun tasdiqlash kodi: ${generateCode}`;

    await this.smsService.sendSMS(dto.phone, message);

    await this.cacheManager.set(dto.phone, generateCode, 120000);
  }

  async verifay(dto: VerifayDto): Promise<ResData<boolean>> {
    let chacked = false;

    const phoneCode = await this.cacheManager.get(dto.phone);

    if (phoneCode == dto.code) {
      chacked = true;
    }

    return new ResData<boolean>('Verifay sms code', 200, chacked);
  }
}
