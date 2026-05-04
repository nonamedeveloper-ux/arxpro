import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginOrPasswordWrongException extends HttpException {
  constructor() {
    super('Login or password is wrong', HttpStatus.BAD_REQUEST);
  }
}

export class UserPhoneSuchExseption extends HttpException {
  constructor() {
    super('There is such a phone user', 400);
  }
}

export class LoginAlreadyUsed extends HttpException {
  constructor() {
    super('Login already used', HttpStatus.BAD_REQUEST);
  }
}

export class NickNameIsNotException extends HttpException {
  constructor() {
    super('nick name is not unique', HttpStatus.BAD_REQUEST);
  }
}
