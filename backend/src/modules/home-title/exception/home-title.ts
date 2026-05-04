import { HttpException, HttpStatus } from '@nestjs/common';

export class HomeTitleNotFoundException extends HttpException {
  constructor() {
    super('Home title description not found', HttpStatus.NOT_FOUND);
  }
}
