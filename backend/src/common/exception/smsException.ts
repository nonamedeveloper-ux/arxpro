import { HttpException, HttpStatus } from '@nestjs/common';

export class SmsNotSendException extends HttpException {
  constructor({ message }: { message: any }) {
    super('sms not send' + message, HttpStatus.NOT_FOUND);
  }
}
