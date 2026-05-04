import { DataSource, DataSourceOptions } from 'typeorm';
import { IConfig } from './interfaces/config.interface';
import * as dotenv from 'dotenv';
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const config: IConfig = {
  Port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DB_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiredIn: process.env.JWT_EXPIRED_IN || '1d',
  smsApiUrl: process.env.SMS_API_URL,
  smsEmail: process.env.SMS_EMAIL,
  smsPassword: process.env.SMS_PASSWORD,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  imageSize: Number(process.env.IMAGE_SIZE) || 5242880,
  imageCount: Number(process.env.IMAGE_COUNT) || 10,
  videoSize: Number(process.env.VIDEO_SIZE) || 52428800,
};

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: config.dbUrl,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../database/migration/*{.ts,.js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: false },
};

const dataSourse = new DataSource(typeOrmConfig);
export default dataSourse;
