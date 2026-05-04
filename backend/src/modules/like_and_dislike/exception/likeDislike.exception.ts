import { HttpException, HttpStatus } from '@nestjs/common';

export class LikeAndDislikeNotFoundException extends HttpException {
  constructor() {
    super('architektor or project id not found', HttpStatus.NOT_FOUND);
  }
}
