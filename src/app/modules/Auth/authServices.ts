import AppError from '../../Error/AppError';
import userModel from '../users/userModel';
import { TAuth } from './authInterface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TAuth) => {
  const user = await userModel.isUserExistFindByCustomId(payload?.id);
  //   console.log(user);
  if (!user) {
    throw new AppError(400, 'User not found');
  }

  if (user?.status === 'blocked') {
    throw new AppError(400, 'user is already blocked');
  }

  if (user?.isDeleted) {
    throw new AppError(400, 'user is already deleted');
  }

  const isPasswordMatched = await userModel.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password not matched');
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  //   access token

  const accessToken = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_token_secret as string,
    { expiresIn: '1d' },
  );

  //   reFreshToken
  const refreshToken = jwt.sign(
    {
      jwtPayload,
    },
    config.refresh_jwt_token_secret as string,
    { expiresIn: config.refresh_token_expiresIn },
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const userId = userData.jwtPayload.id;
  const role = userData.jwtPayload.role;
  //   console.log({ userData }, userId, role);
  const user = await userModel.isUserExistFindByCustomId(userId);

  if (!user) {
    throw new AppError(400, 'User not found');
  }

  if (user?.status === 'blocked') {
    throw new AppError(400, 'user is already blocked');
  }

  if (user?.isDeleted) {
    throw new AppError(400, 'user is already deleted');
  }

  const isPasswordMatched = await userModel.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password not matched');
  }
  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound),
  );

  const result = await userModel.findOneAndUpdate(
    { id: userId, role: role },
    {
      password: newPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    },
  );

  return result;
};

const createRefreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(401, 'you are not authorized');
  }

  // invalid token - synchronous

  const decoded = jwt.verify(
    token,
    config.refresh_jwt_token_secret as string,
  ) as JwtPayload;

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

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };
  //   access token

  const accessToken = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_token_secret as string,
    { expiresIn: config.access_token_expiresIn },
  );

  return accessToken;
};

export const authServices = {
  loginUser,
  changePassword,
  createRefreshToken,
};
