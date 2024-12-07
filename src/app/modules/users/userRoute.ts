import express from 'express';
import { userController } from './userController';

import { studentSchemaValidations } from '../students/StudentZodValidationSchem';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { facultyValidation } from '../faculty/facultyValidation';

const userRoute = express.Router();

userRoute.post(
  '/create-student',
  checkValidationRequest(studentSchemaValidations.studentSchemaValidationZod),
  userController.createStudent,
);
userRoute.post(
  '/create-faculty',
  checkValidationRequest(facultyValidation.createFacultyValidationSchema),
  userController.createFaculty,
);

export default userRoute;
