import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectCategoryNotFoundException extends HttpException {
  constructor() {
    super('Project category not found', HttpStatus.NOT_FOUND);
  }
}
