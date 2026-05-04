import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class SharedModule {}
