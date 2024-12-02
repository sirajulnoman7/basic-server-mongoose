import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFacultyInterface';

const createAcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const academicFacultyModel = model<TAcademicFaculty>(
  'academic-faculty',
  createAcademicFacultySchema,
);

export default academicFacultyModel;
