import { Router } from 'express';
import { authController } from './authController';
import {
  authChangePasswordValidationSchema,
  authValidationSchema,
  forgetPasswordValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
} from './AuthValidation';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import checkAuth from '../../middlewares/checkAuth';
import { userRole } from '../users/user.constant';

const authRoute = Router();
authRoute.post(
  '/login',
  checkValidationRequest(authValidationSchema),
  authController.loginUser,
);

authRoute.post(
  '/change-password',
  checkAuth(userRole.admin, userRole.faculty, userRole.student),
  checkValidationRequest(authChangePasswordValidationSchema),
  authController.changePassword,
);
authRoute.post(
  '/refresh-token',
  checkValidationRequest(refreshTokenValidationSchema),
  authController.createRefreshToken,
);

authRoute.post(
  '/forgot-password',
  checkValidationRequest(forgetPasswordValidationSchema),
  authController.forgetPassword,
);
authRoute.post(
  '/reset-password',
  checkValidationRequest(resetPasswordValidationSchema),
  authController.resetPassword,
);

export default authRoute;
