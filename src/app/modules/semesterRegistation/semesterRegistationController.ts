import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import { semesterRegistrationService } from './semesterRegistationServices';

const createSemesterRegistrationIntoDB = catchAsync(async (req, res) => {
  console.log({ object: req.body });
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'semester registration created successfully',
    data: result,
  });
});
const getAllSemesterRegistrationsIntoDB = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationsIntoDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'semester registration get  successfully',
    data: result,
  });
});
const getSingleSemesterRegistrationsIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationsIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' get single  semester registration successfully',
    data: result,
  });
});

const updateSemesterRegistrationIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' update semester registration successfully',
    data: result,
  });
});

const deleteSemesterRegistrationsIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.deleteSemesterRegistrationIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' delete   semester registration successfully',
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsIntoDB,
  getSingleSemesterRegistrationsIntoDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationsIntoDB,
};
