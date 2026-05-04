import { HttpException, HttpStatus } from '@nestjs/common';

export class PlansNotFoundException extends HttpException {
  constructor() {
    super('Plans not found', HttpStatus.NOT_FOUND);
  }
}
