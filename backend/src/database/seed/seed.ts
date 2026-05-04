import { createConnection, DataSource } from 'typeorm';
import { typeOrmConfig } from '../../common/config/typeorm.config';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { hashed } from '../../lib/bcrypt';
import { RoleEnum } from 'src/common/enums/enum';

(async () => {
  const datasource: DataSource = await createConnection(typeOrmConfig);

  const queryRunner = datasource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const userRepository = queryRunner.manager.getRepository(UserEntity);

    const users = await userRepository.find();
    await userRepository.remove(users);

    const heshPassword1 = await hashed('@Admin_0703');

    const dto1 = {
      phone: '+998991853703',
      password: heshPassword1,
      nickName: 'Oxunjon',
      role: RoleEnum.ADMIN,
    };

    let user1 = userRepository.create(dto1);
    user1 = await userRepository.save(user1);

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
