import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  mongoDB_URL: process.env.mongoDBURL,
  saltRound: process.env.saltRounds,
  default_password: process.env.defaultPassword,
};
