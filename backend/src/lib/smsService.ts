import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { config } from '../common/config/typeorm.config';

@Injectable()
export class SmsService {
  private readonly apiUrl = config.smsApiUrl;
  private token: string;

  constructor(private readonly configService: ConfigService) {}

  private async authenticate(): Promise<void> {
    try {
      const email = this.configService.get<string>('SMS_EMAIL');
      const password = this.configService.get<string>('SMS_PASSWORD');

      const response: AxiosResponse = await axios.post(
        `${this.apiUrl}/auth/login`, // Ensure this is correctly set
        { email, password },
      );

      this.token = response.data.data.token;
    } catch (error) {
      throw new HttpException(
        'Error authenticating with Eskiz',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.token) {
      await this.authenticate();
    }
  }

  async sendSMS(phoneNumber: string, message: string, retry = true): Promise<void> {
    await this.ensureAuthenticated();

    try {
      await axios.post(
        `${this.apiUrl}/message/sms/send`,
        {
          mobile_phone: phoneNumber,
          message: message,
          from: '4546',
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );
    } catch (error) {
      if (error.response?.status === 401 && retry) {
        this.token = null;
        return this.sendSMS(phoneNumber, message, false);
      }
      throw new HttpException(
        'Error sending SMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
