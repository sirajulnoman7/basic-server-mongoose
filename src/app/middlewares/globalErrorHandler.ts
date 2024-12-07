/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../../middlewareErrorInterface/error';
import config from '../config';
import handleValidationError from '../Error/handleMongoseError';
import handleZodError from '../Error/handleZodValidationError';
import handleCastError from '../Error/handleCastError';
import handleDuplicateError11000 from '../Error/handleDuplicateError';
import AppError from '../Error/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError11000(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
    // err,
  });
};

export default globalErrorHandler;
