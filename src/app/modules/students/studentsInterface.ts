import { Model, Types } from 'mongoose';

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardant = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type LocalGuardant = {
  name: string;
  contactNo: string;
  address: string;
};

export type Students = {
  age: number;
  name: Name;
  address: string;
  email: string;
  contactNo: string;
  profileImg: string;
  dateOfBirth?: Date;
  gender: 'male' | 'female';
  emergenceContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardant: Guardant;
  localGuardant: LocalGuardant;
  password: string;
  isDelete: boolean;
  id: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  user: Types.ObjectId; //user referencing with student interface
};

export interface StudentsMethod {
  isUserExists(id: string): Promise<Students | null>;
}

// Create a new Model type that knows about IUserMethods...
export type StudentModelInstance = Model<
  Students,
  Record<string, never>,
  StudentsMethod
>;
