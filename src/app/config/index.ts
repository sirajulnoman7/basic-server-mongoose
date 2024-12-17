import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoDB_URL: process.env.mongoDBURL,
  saltRound: process.env.saltRounds,
  default_password: process.env.defaultPassword,
  jwt_token_secret: process.env.jwt_token_secret,
  refresh_jwt_token_secret: process.env.refresh_jwt_token_secret,
  access_token_expiresIn: process.env.access_token_expiresIn,
  refresh_token_expiresIn: process.env.refresh_token_expiresIn,
};
