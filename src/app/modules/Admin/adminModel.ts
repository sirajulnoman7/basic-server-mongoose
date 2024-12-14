import { model, Schema } from 'mongoose';
import { TAdmin, TUserName } from './adminInterface';
import { BloodGroup } from '../faculty/faculty.constant';

const nameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const adminSchema = new Schema<TAdmin>({
  name: {
    type: nameSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: { type: String },
  dateOfBirth: { type: String },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not supported',
    },
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: BloodGroup,
      message: '{VALUE} is not supported',
    },
    required: true,
  },
  designation: {
    type: String,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'user',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const adminModel = model<TAdmin>('admin', adminSchema);

export default adminModel;
