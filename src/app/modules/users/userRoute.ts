import express from 'express';
import { userController } from './userController';

import { studentSchemaValidations } from '../students/StudentZodValidationSchem';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { facultyValidation } from '../faculty/facultyValidation';
import { AdminValidations } from '../Admin/adminValidation';
import checkAuth from '../../middlewares/checkAuth';
import { userRole } from './user.constant';
import { UserValidation } from './userValidation';

const userRoute = express.Router();

userRoute.post(
  '/create-student',
  checkAuth(userRole.admin),
  checkValidationRequest(studentSchemaValidations.studentSchemaValidationZod),
  userController.createStudent,
);
userRoute.post(
  '/create-faculty',
  checkAuth(userRole.admin),
  checkValidationRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);
userRoute.post(
  '/create-admin',
  checkValidationRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin,
);
userRoute.get(
  '/me',
  checkAuth(userRole.admin, userRole.faculty, userRole.student),
  userController.getMe,
);
userRoute.post(
  '/change-status/:id',
  checkAuth(userRole.admin, userRole.faculty),
  checkValidationRequest(UserValidation.changeUserStatusSchema),
  userController.changeStatus,
);

export default userRoute;
