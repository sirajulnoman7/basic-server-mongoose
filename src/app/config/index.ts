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
  reset_pass_ui_link: process.env.reset_pass_ui_link,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
};
