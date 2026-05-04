import { HttpException } from '@nestjs/common';

export class SubscribersNotFoundException extends HttpException {
  constructor() {
    super('subscribers not found', 404);
  }
}
export class UserIdFoundException extends HttpException {
  constructor() {
    super('This user has subscribed', 404);
  }
}
