import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from '../dto/auth.dto';

export interface ILoginData {
  user: UserEntity;
  token: string;
}
export interface IAuthService {
  login(username: string, password: string): Promise<ILoginData>;
  register(user: UserEntity): Promise<CreateUserDto>;
}
