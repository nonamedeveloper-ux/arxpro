import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from '../common/config/typeorm.config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: config.mailPort === 465, // true for 465, false for other ports
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: config.mailFrom,
        to,
        subject,
        text,
        html,
      });
      return info;
    } catch (error) {
      console.error('Email sending failed:', error.message);
      return null;
    }
  }

  async sendOtp(to: string, otp: string) {
    console.log('-----------------------------------------');
    console.log(`OTP for ${to}: ${otp}`);
    console.log('-----------------------------------------');

    const subject = '🔐 Tasdiqlash kodi - Archify';
    const text = `Sizning tasdiqlash kodingiz: ${otp}`;
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2D3748; margin: 0;">Archify</h1>
          <p style="color: #718096; font-size: 14px;">Arxitektura va dizayn platformasi</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
          <h2 style="color: #1A202C; margin-bottom: 10px;">Xush kelibsiz!</h2>
          <p style="color: #4A5568; line-height: 1.6; margin-bottom: 25px;">
            Ro'yxatdan o'tishni yakunlash uchun quyidagi tasdiqlash kodidan foydalaning. Ushbu kod 2 daqiqa davomida amal qiladi.
          </p>
          
          <div style="background-color: #EDF2F7; padding: 15px; border-radius: 6px; display: inline-block; margin-bottom: 25px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #3182CE;">${otp}</span>
          </div>
          
          <p style="color: #718096; font-size: 12px;">
            Agar siz ushbu so'rovni yubormagan bo'lsangiz, iltimos, ushbu xatga e'tibor bermang.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #A0AEC0; font-size: 12px;">
          <p>&copy; 2026 Archify. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    `;
    return this.sendMail(to, subject, text, html);
  }
}
