import { Router } from 'express';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { academicFacultyValidation } from './academicFacultyValidation';
import { academicFacultyController } from './academicFacultyController';

const academicFacultiesRoute = Router();

academicFacultiesRoute.post(
  '/create-faculty',
  checkValidationRequest(
    academicFacultyValidation.academicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);
academicFacultiesRoute.get(
  '/',
  academicFacultyController.getAllAcademicFacultiesFromDB,
);
academicFacultiesRoute.get(
  '/:facultyId',
  academicFacultyController.getSingleAcademicFacultyFromDB,
);
academicFacultiesRoute.patch(
  '/:facultyId',
  checkValidationRequest(
    academicFacultyValidation.academicFacultyValidationSchema,
  ),
  academicFacultyController.updateAcademicFacultyIntoDB,
);

export default academicFacultiesRoute;
