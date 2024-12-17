import config from '../../config';
import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import { authServices } from './authServices';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...password } = req.body;
  // console.log({ user }, req.body);
  const result = await authServices.changePassword(user, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'password updated is success',
    data: result,
  });
});
const createRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // console.log({ refreshToken });
  const result = await authServices.createRefreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Access token is retrieved successfully!',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  createRefreshToken,
};
