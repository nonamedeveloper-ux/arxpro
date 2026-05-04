import { HttpException, HttpStatus } from '@nestjs/common';

export class ArchitektorNotFoundException extends HttpException {
  constructor() {
    super('Architektor not found', HttpStatus.NOT_FOUND);
  }
}

export class ArchitektorFoundNiceNameException extends HttpException {
  constructor() {
    super('The name of such an architect was used', HttpStatus.NOT_FOUND);
  }
}

export class ArchitektorNotAdminException extends HttpException {
  constructor() {
    super('This user is not architektor', HttpStatus.BAD_REQUEST);
  }
}
export class ArchitektorAlreadyExistException extends HttpException {
  constructor() {
    super('Architektor already exist', HttpStatus.BAD_REQUEST);
  }
}
