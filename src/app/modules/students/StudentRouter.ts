import express from 'express';
import { StudentController } from './StudentController';

// create a route for student , handle req,and res on my controller function
const studentRouter = express.Router();

studentRouter.get('/', StudentController.getStudents);
studentRouter.get('/:email', StudentController.getStudents);
studentRouter.delete('/:idx', StudentController.deleteOne);

export default studentRouter;
// export const getAllStudentRoute = studentRouter;
