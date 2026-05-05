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
    
    const subject = 'Your Verification Code';
    const text = `Your verification code is: ${otp}`;
    const html = `<b>Your verification code is: ${otp}</b>`;
    return this.sendMail(to, subject, text, html);
  }
}
