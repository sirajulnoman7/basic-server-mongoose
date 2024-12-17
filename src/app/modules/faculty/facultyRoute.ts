import { Router } from 'express';
import { FacultyControllers } from './facultyController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { updateFacultyValidationSchema } from './facultyValidation';
import checkAuth from '../../middlewares/checkAuth';
import { userRole } from '../users/user.constant';

const FacultyRoutes = Router();
FacultyRoutes.get('/:id', FacultyControllers.getSingleFaculty);

FacultyRoutes.patch(
  '/:id',
  checkValidationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

FacultyRoutes.delete('/:id', FacultyControllers.deleteFaculty);

FacultyRoutes.get(
  '/',
  checkAuth(userRole.admin),
  FacultyControllers.getAllFaculties,
);

export default FacultyRoutes;
