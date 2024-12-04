import express from 'express';
import { StudentController } from './StudentController';
import { updateStudentValidationSchema } from './StudentZodValidationSchem';
import checkValidationRequest from '../../middlewares/checkValidationRequest';

// create a route for student , handle req,and res on my controller function
const studentRouter = express.Router();

studentRouter.get('/', StudentController.getStudents);
studentRouter.get('/:studentId', StudentController.findOneStudent);
studentRouter.patch(
  '/:studentId',
  checkValidationRequest(updateStudentValidationSchema),
  StudentController.findOneAndUpdateStudent,
);
studentRouter.delete('/:studentId', StudentController.deleteOne);

export default studentRouter;
// export const getAllStudentRoute = studentRouter;
