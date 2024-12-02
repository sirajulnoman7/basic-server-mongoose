import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { StudentModel } from '../students/students.schema.module';
import { Students } from '../students/studentsInterface';
import { generateStudentId } from './user.utilitis';
import { TUser } from './userInterface';
import userModel from './userModel';

const createStudentInDB = async (password: string, studentData: Students) => {
  //   create a user obj
  const userData: Partial<TUser> = {}; //partial type to convert optional with main type
  userData.password = password || (config.default_password as string);

  //    set a role student
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );

  // set  generated id
  userData.id = await generateStudentId(admissionSemester);

  // default generated id
  // userData.id = '203012345';
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
