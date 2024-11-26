import { NextFunction, Request, Response } from 'express';
import { studentServices } from './StudentService';

// import studentValidationSchema from './StudentValidationSchema';

// this controller handle just for req and res,| and all of query and related function handle a service Controller

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getStudentInDB();
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findOneStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.params.email;
    const result = await studentServices.getOneStudentInDB(email);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idx } = req.params;
    const result = await studentServices.deleteStudentInDB(idx);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getStudents,
  findOneStudent,
  deleteOne,
};
