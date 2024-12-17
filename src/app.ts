/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app = express();
// parser
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
  }),
);
app.use(cookieParser());
// application routes
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandler);
// route not found middleware
app.use(notFound);
export default app;
