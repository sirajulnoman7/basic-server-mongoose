import { model, Schema } from 'mongoose';
import TAcademicDepartment from './academicDepartmentInterface';
import AppError from '../../Error/AppError';

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    // required: [true, 'faculty is i required'],
    // unique: true,
    ref: 'academic-faculty',
  },
});

// check department is exist
createAcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExits = await academicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExits) {
    throw new AppError(400, 'department already exist');
  }
  next();
});

// check is provide a wrong id to update user data

createAcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExits = await academicDepartmentModel.findOne(query);
  if (!isDepartmentExits) {
    throw new AppError(400, 'department is not updated please check again');
  }
  next();
});

const academicDepartmentModel = model<TAcademicDepartment>(
  'academic-department',
  createAcademicDepartmentSchema,
);
export default academicDepartmentModel;
