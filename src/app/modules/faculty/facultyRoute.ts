import { Router } from 'express';
import { FacultyControllers } from './facultyController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { updateFacultyValidationSchema } from './facultyValidation';

const FacultyRoutes = Router();
FacultyRoutes.get('/:id', FacultyControllers.getSingleFaculty);

FacultyRoutes.patch(
  '/:id',
  checkValidationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

FacultyRoutes.delete('/:id', FacultyControllers.deleteFaculty);

FacultyRoutes.get('/', FacultyControllers.getAllFaculties);

export default FacultyRoutes;
