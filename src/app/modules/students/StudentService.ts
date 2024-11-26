import { StudentModel } from '../students.schema.module';

//  service to handle connecting database
// const createStudentInDB = async (student: Students) => {
//   const result = await StudentModel.create(student);
//   return result;
// };

// create custom instance method using mongoose
// const fullName: string = user.fullName(); // 'Jean-Luc Picard'

const getStudentInDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// const getOneStudentInDB = async (id: string) => {
//   const result = await StudentModel.findOne({ id });
//   return result;
// };
const getOneStudentInDB = async (id: string) => {
  const result = await StudentModel.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentInDB = async (idx: string) => {
  const result = await StudentModel.updateOne({ idx }, { isDelete: true });
  return result;
};

export const studentServices = {
  getStudentInDB,
  getOneStudentInDB,
  deleteStudentInDB,
};
