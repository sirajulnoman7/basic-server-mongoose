import { Router } from 'express';
import { courseController } from './courseController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { CourseValidations } from './courseValidation';
import checkAuth from '../../middlewares/checkAuth';
import { userRole } from '../users/user.constant';

const courseRoute = Router();

courseRoute.post(
  '/create-course',
  checkAuth(userRole.admin),
  checkValidationRequest(CourseValidations.createCourseValidationSchema),
  courseController.createCourse,
);
courseRoute.get('/', courseController.getAllCourse);
courseRoute.get('/:id', courseController.getSingleCourse);
courseRoute.patch(
  '/:id',
  checkAuth(userRole.admin),
  courseController.updateCourse,
);
courseRoute.put(
  '/:courseId/assign-faculty',
  checkValidationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultyWithCourse,
);
courseRoute.delete(
  '/:courseId/remove-faculty',
  checkAuth(userRole.admin),
  checkValidationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.removeFacultyWithCourse,
);

courseRoute.delete(
  '/:id',
  checkAuth(userRole.admin),
  courseController.deleteCourse,
);

export default courseRoute;
