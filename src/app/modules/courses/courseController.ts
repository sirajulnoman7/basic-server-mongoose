import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import { courseService } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await courseService.createCourseInDB(body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'course created successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseInDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get single course successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseService.getAllCourseInDB(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all course successfully',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.updateSingleCourseInDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update course successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseInDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get all course successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
};
