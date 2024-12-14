import { Router } from 'express';
import { offerCourseController } from './offerCourseController';
import checkValidationRequest from '../../middlewares/checkValidationRequest';
import { OfferedCourseValidations } from './offerdCourseValidation';

const offeredCourseRoute = Router();

offeredCourseRoute.post(
  '/create-offered-courses',
  checkValidationRequest(
    OfferedCourseValidations.createOfferedCourseValidationSchema,
  ),
  offerCourseController.createOfferCourse,
);

offeredCourseRoute.get('/', offerCourseController.getAllOfferCourse);
offeredCourseRoute.get('/:id', offerCourseController.getSingleOfferCourse);
offeredCourseRoute.patch(
  '/update-offered-courses/:id',
  checkValidationRequest(
    OfferedCourseValidations.updateOfferedCourseValidationSchema,
  ),
  offerCourseController.updateOfferCourse,
);
offeredCourseRoute.delete('/:id', offerCourseController.deleteOfferCourse);

export default offeredCourseRoute;
