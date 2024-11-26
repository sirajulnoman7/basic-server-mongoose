import { Schema, model } from 'mongoose';
import {
  Guardant,
  LocalGuardant,
  Name,
  StudentModelInstance,
  Students,
  StudentsMethod,
} from './students/studentsInterface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    require: [true, 'first name is required. Please provide a valid name.'],
    maxlength: [10, 'name is les then 10 character.'],

    // validate: {
    //   validator: function (value: string) {
    //     // Ensure the first character is uppercase and the rest are lowercase
    //     const formattedValue =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return value === formattedValue;
    //   },
    //   message:
    //     '{VALUE} is not in the correct format. The first letter must be uppercase, and the rest lowercase.',
    // },
  },
  middleName: {
    type: String,
    required: [true, 'Middle Name is required. Please provide a valid name.'],
  },
  lastName: { type: String, required: true },
});
const guardantSchema = new Schema<Guardant>({
  fatherName: {
    type: String,
    required: [true, 'Name is required. Please provide a valid name.'],
  },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  motherContactNo: { type: String, required: true },
});
const localGuardantSchema = new Schema<LocalGuardant>({
  name: { type: String },
  contactNo: { type: String },
  address: { type: String },
});

const studentSchema = new Schema<
  Students,
  StudentModelInstance,
  StudentsMethod
>(
  {
    name: { type: nameSchema },
    email: {
      type: String,
      required: true,
    },
    contactNo: { type: String, required: true },
    gender: {
      type: String,
      enum: { values: ['male', 'female'], message: '{VALUE} is not supported' },
      required: true,
    },
    emergenceContactNo: { type: String },
    // apply validation for array ,
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardant: guardantSchema,
    localGuardant: localGuardantSchema,
    isDelete: { type: Boolean, default: false },
    idx: { type: String },
    id: String,
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user is i required'],
      unique: true,
      ref: 'userModel',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// middleware for password  hex string convert

// studentSchema.pre('find', function (next) {
//   this.find({ isDelete: { $ne: true } });
//   next();
// });
// studentSchema.pre('findOne', function (next) {
//   this.find({ isDelete: { $ne: true } });
//   next();
// });

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
//   next();
// });

// mongoose virtual method
// studentSchema.virtual('fullname').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });
// studentSchema.virtual("fullName").get(function(){
//    return `${this.firstName} ${this.middleName}`
// })

//  Create a Model.

// creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// };

export const StudentModel = model<Students>('Student', studentSchema);
