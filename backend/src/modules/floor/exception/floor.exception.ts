import { HttpException, HttpStatus } from '@nestjs/common';

export class FloorNotFoundException extends HttpException {
  constructor() {
    super('Floor not found', HttpStatus.NOT_FOUND);
  }
}
