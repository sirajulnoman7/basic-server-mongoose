import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// use higher order function , because i need to parameter explain: you don't coll middleware func with parameter
const checkValidationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation zod
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      // console.log('validation ', req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default checkValidationRequest;
