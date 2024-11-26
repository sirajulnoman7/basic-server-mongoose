import { NextFunction, Request, Response } from 'express';
import { userServices } from './userServices';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, studentData } = req.body;
    // console.log(password, studentData);
    // const studentValidatedData = studentSchemaValidationZod.parse(studentData);
    const result = await userServices.createStudentInDB(password, studentData);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
