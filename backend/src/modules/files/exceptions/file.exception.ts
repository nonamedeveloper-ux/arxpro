import { HttpException, HttpStatus } from '@nestjs/common';

export class FileTypeException extends HttpException {
  constructor(fileType: string) {
    super(
      'The expected file type is image, but this file is an ' + fileType,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileTypeVideoException extends HttpException {
  constructor(fileType: string) {
    super(
      'The expected file type is video, but this file is an' + fileType,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class FileNotFound extends HttpException {
  constructor() {
    super('File Not Found', 404);
  }
}

export class FilePathNotFound extends HttpException {
  constructor() {
    super('File Path Not Found', 404);
  }
}

export class ImageCountExceededException extends HttpException {
  constructor() {
    super('The number of images has exceeded the limit', 404);
  }
}
