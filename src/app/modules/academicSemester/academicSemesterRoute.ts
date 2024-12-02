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
academicSemesterRoute.get(
  '/',
  academicSemesterController.getAllAcademicSemestersFromDB,
);
academicSemesterRoute.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemesterFromDB,
);
academicSemesterRoute.patch(
  '/:semesterId',
  checkValidationRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemesterIntoDB,
);

export default academicSemesterRoute;
