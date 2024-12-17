import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utilits/catchAsync';
import AppError from '../Error/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/userInterface';
import userModel from '../modules/users/userModel';

// use higher order function , because i need to parameter explain: you don't coll middleware func with parameter
const checkAuth = (...requiredRole: TUserRole[]) => {
  // console.log({requiredRole});
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      throw new AppError(401, 'you are not authorized');
    }

    // invalid token - synchronous

    const decoded = jwt.verify(
      token,
      config.jwt_token_secret as string,
    ) as JwtPayload;

    const role = decoded.jwtPayload.role;
    const userId = decoded.jwtPayload.id;
    const iat = decoded.iat;

    // console.log();

    const user = await userModel.isUserExistFindByCustomId(userId);

    // console.log(user);
    if (!user) {
      throw new AppError(400, 'User not found');
    }

    if (user?.status === 'blocked') {
      throw new AppError(400, 'user is already blocked');
    }

    if (user?.isDeleted) {
      throw new AppError(400, 'user is already deleted');
    }

    // check time and when user change the password this time those toke is will be invalid ;
    if (
      user.passwordChangeTime &&
      (await userModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeTime,
        iat as number,
      ))
    ) {
      throw new AppError(401, 'you are not authorized');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, 'you are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default checkAuth;
