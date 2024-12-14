import { Router } from 'express';
import { semesterRegistrationController } from './semesterRegistationController';

const semesterRegistrationRoutes = Router();

semesterRegistrationRoutes.post(
  '/create-semester-registration',

  semesterRegistrationController.createSemesterRegistrationIntoDB,
);
semesterRegistrationRoutes.get(
  '/',
  semesterRegistrationController.getAllSemesterRegistrationsIntoDB,
);
semesterRegistrationRoutes.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistrationsIntoDB,
);
semesterRegistrationRoutes.patch(
  '/:id',

  semesterRegistrationController.updateSemesterRegistrationIntoDB,
);

semesterRegistrationRoutes.delete(
  '/:id',
  semesterRegistrationController.deleteSemesterRegistrationsIntoDB,
);

export default semesterRegistrationRoutes;
