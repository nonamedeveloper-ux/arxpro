import { HttpException } from '@nestjs/common';

export class PasswordOrLoginWrong extends HttpException {
  constructor() {
    super('Password Or Login Wrong', 404);
  }
}

export class UserNotFoundExseption extends HttpException {
  constructor() {
    super('User not found', 400);
  }
}

export class UserPhoneSuchExseption extends HttpException {
  constructor() {
    super('There is such a phone user', 400);
  }
}
