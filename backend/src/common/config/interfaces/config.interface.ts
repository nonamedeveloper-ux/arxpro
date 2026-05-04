export interface IConfig {
  Port: number;
  dbUrl: string;
  jwtSecretKey: string;
  jwtExpiredIn: string;
  smsEmail: string;
  smsPassword: string;
  smsApiUrl: string;
  redisHost: string;
  redisPort: number;
  imageSize: number;
  imageCount: number;
  videoSize: number;
  mailHost: string;
  mailPort: number;
  mailUser: string;
  mailPass: string;
  mailFrom: string;
}
