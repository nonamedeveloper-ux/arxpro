import { HttpException, HttpStatus } from '@nestjs/common';

export class DistrictNotFoundException extends HttpException {
  constructor() {
    super('District not found', HttpStatus.NOT_FOUND);
  }
}
