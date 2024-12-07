import { Router } from 'express';
import { courseController } from './courseController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { CourseValidations } from './courseValidation';

const courseRoute = Router();

courseRoute.post(
  '/create-course',
  checkValidationRequest(CourseValidations.createCourseValidationSchema),
  courseController.createCourse,
);
courseRoute.get('/', courseController.getAllCourse);
courseRoute.get('/:id', courseController.getSingleCourse);
courseRoute.patch('/:id', courseController.updateCourse);
courseRoute.delete('/:id', courseController.deleteCourse);

export default courseRoute;
