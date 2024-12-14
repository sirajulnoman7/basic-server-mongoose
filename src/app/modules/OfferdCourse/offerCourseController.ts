import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import { offerCourseServices } from './offerCourseServices';

const createOfferCourse = catchAsync(async (req, res) => {
  const result = await offerCourseServices.createOfferCourse(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Offer course created successfully',
    data: result,
  });
});

const updateOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await offerCourseServices.updateOfferCourse(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Offer course updated successfully',
    data: result,
  });
});
const getAllOfferCourse = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await offerCourseServices.getAllOfferCourse(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all Offer course  successfully',
    data: result,
  });
});
const getSingleOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await offerCourseServices.getSingleOfferCourse(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get single Offer course  successfully',
    data: result,
  });
});
const deleteOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  //   console.log({ id });
  const result = await offerCourseServices.getSingleOfferCourse(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'delete single Offer course  successfully',
    data: result,
  });
});

export const offerCourseController = {
  createOfferCourse,
  updateOfferCourse,
  getAllOfferCourse,
  getSingleOfferCourse,
  deleteOfferCourse,
};
