import { HttpException } from '@nestjs/common';

export class UserMessageNotFoundExseption extends HttpException {
  constructor() {
    super('user message not found', 404);
  }
}
