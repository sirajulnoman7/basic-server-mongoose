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
courseRoute.put(
  '/:courseId/assign-faculty',
  checkValidationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultyWithCourse,
);
courseRoute.delete(
  '/:courseId/remove-faculty',
  checkValidationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.removeFacultyWithCourse,
);

courseRoute.delete('/:id', courseController.deleteCourse);

export default courseRoute;
