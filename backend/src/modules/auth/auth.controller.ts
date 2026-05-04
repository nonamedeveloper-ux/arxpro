import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { SentSmsDto } from './dto/sentSms.dto';
import { VerifayDto } from './dto/verifayDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('send-sms')
  async SentSms(@Body() sentSms: SentSmsDto) {
    await this.authService.sentSms(sentSms);
  }

  @Post('verify-code')
  async VerifaySmsCode(@Body() verifayCode: VerifayDto) {
    return await this.authService.verifay(verifayCode);
  }
}
