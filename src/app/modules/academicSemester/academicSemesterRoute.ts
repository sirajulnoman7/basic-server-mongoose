import { Router } from 'express';
import { academicSemesterController } from './academicSemesterController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { academicSemesterValidations } from './academicSemesteValidation';

const academicSemesterRoute = Router();

academicSemesterRoute.post(
  '/create-semesters',
  checkValidationRequest(
    academicSemesterValidations.academicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);

export default academicSemesterRoute;
