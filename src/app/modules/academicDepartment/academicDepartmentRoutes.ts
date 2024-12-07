import { Router } from 'express';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { academicDepartmentValidation } from './academicDepartmentValidation';
import { academicDepartmentController } from './academicDepartmentController';

const academicDepartmentRoute = Router();

academicDepartmentRoute.post(
  '/create-department',
  // checkValidationRequest(
  //   academicDepartmentValidation.academicDepartmentValidationSchema,
  // ),
  academicDepartmentController.createAcademicDepartment,
);
academicDepartmentRoute.get(
  '/',
  academicDepartmentController.getAllAcademicDepartmentsFromDB,
);
academicDepartmentRoute.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartmentFromDB,
);
academicDepartmentRoute.patch(
  '/:departmentId',
  checkValidationRequest(
    academicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  academicDepartmentController.updateAcademicDepartmentIntoDB,
);

export default academicDepartmentRoute;
