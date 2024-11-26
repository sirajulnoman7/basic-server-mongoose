import config from '../../config';
import { StudentModel } from '../students.schema.module';
import { Students } from '../students/studentsInterface';
import { TUser } from './userInterface';
import userModel from './userModel';

const createStudentInDB = async (password: string, studentData: Students) => {
  //   create a user obj
  const userData: Partial<TUser> = {}; //partial type to convert optional with main type
  userData.password = password || (config.default_password as string);

  //    set a role student
  userData.role = 'student';

  // default generated id
  userData.id = '203012345';
  const newUser = await userModel.create(userData);
  //   create student new student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //embed id
    studentData.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentInDB,
};
