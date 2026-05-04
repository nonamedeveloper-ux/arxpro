import { HttpException, HttpStatus } from '@nestjs/common';

export class DescriptionNotFoundException extends HttpException {
  constructor() {
    super('Description not found', HttpStatus.NOT_FOUND);
  }
}
