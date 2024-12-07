import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.mongoDB_URL as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
// async
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// synchronous
process.on('uncaughtException', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  process.exit(1);
});
