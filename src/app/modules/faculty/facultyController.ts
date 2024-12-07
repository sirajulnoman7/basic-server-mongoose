import catchAsync from '../../utilits/catchAsync';
import sendResponse from '../../utilits/rsendResponse';
import { facultyServices } from './facultyService';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
