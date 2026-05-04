import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminNotFoundException extends HttpException {
  constructor() {
    super('Admin not found', HttpStatus.NOT_FOUND);
  }
}

export class UserNotAdminException extends HttpException {
  constructor() {
    super('This user is not admin', HttpStatus.BAD_REQUEST);
  }
}

export class UserIdAdminException extends HttpException {
  constructor() {
    super('This user id is admin', HttpStatus.BAD_REQUEST);
  }
}
