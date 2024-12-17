import { startSession } from 'mongoose';
import { StudentModel } from './students.schema.module';
import userModel from '../users/userModel';
import AppError from '../../Error/AppError';
import { Students } from './studentsInterface';
import QueryBuilder from '../../builders/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getStudentInDB = async (query: Record<string, unknown>) => {
  // // {email:#regex{query.searchTerm,$options:1}}

  // const queryObject = { ...query }; //copy main query
  // const studentSearchableFields = ['email', 'name.firstName'];

  // // method chaining 1
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const excludeFields = [
  //   'searchTerm',
  //   'sort',
  //   'limit',
  //   'skip',
  //   'page',
  //   'fields',
  // ];
  // excludeFields.forEach((field) => delete queryObject[field]); //do not direct delete query better way copy the query
  // console.log({ query }, { queryObject });
  // // method chaining -2

  // const filterQuery = searchQuery
  //   .find(queryObject)

  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // // method chaining -3
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // // method chaining -4
  // let skip = 0;
  // let limit = 1;
  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // let page = 1;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // //   // method chaining -5
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // method chaining -6
  // let fields = '-__v';
  // if (fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const selectQuery = await limitQuery.select(fields);

  // return selectQuery;

  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),

    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getOneStudentInDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

// update student in DB
const getOneAndUpdateStudentInDB = async (
  id: string,
  payload: Partial<Students>,
) => {
  const { name, guardant, localGuardant, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardant && Object.keys(guardant).length) {
    for (const [key, value] of Object.entries(guardant)) {
      modifiedUpdatedData[`guardant.${key}`] = value;
    }
  }

  if (localGuardant && Object.keys(localGuardant).length) {
    for (const [key, value] of Object.entries(localGuardant)) {
      modifiedUpdatedData[`localGuardant.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// deleted item student and user,so use session
const deleteStudentInDB = async (id: string) => {
  const session = await startSession();
  try {
    session.startTransaction();

    // second trancetion
    // delete User
    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true },
    );
    if (!deleteUser) {
      throw new AppError(400, 'Field to deleted user');
    }

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true },
    );
    if (!deleteStudent) {
      throw new AppError(400, 'Field to deleted user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err) {
    await session.commitTransaction();
    await session.endSession();
  }
};

export const studentServices = {
  getStudentInDB,
  getOneStudentInDB,
  getOneAndUpdateStudentInDB,
  deleteStudentInDB,
};
