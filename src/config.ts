import { cleanEnv, num, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  DATABASE_URL: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  CLIENT_URL: str(),
  JWT_SECRET: str(),
  FRONTEND_URL: str(),
  EMAIL_USER: str(),
  EMAIL_PASSWORD: str(),
  S3_BUCKET: str(),
  S3_REGION: str(),
  S3_ACCESS_KEY_ID: str(),
  S3_SECRET_ACCESS_KEY: str(),
  FILE_MAX_SIZE_MB: num({ default: 2 }),
});
