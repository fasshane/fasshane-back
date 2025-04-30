import { cleanEnv, num, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3001 }),
  DATABASE_URL: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  CALLBACK_URL: str(),
  JWT_SECRET: str(),
  FRONTEND_URL: str(),
});
