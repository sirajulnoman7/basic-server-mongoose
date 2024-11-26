import { model, Schema } from 'mongoose';
import { TUser } from './userInterface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
  id: { type: String },
  password: { type: String },
  needsPasswordChange: { type: Boolean, default: true },
  role: {
    type: String,
    enum: ['admin', 'student', 'faculty'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    default: 'in-progress',
  },
  isDeleted: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

userSchema.post('save', async function (doc, next) {
  try {
    doc.password = '';
  } catch (err: any) {
    next(err);
  }
  next();
});

const userModel = model<TUser>('user', userSchema);
export default userModel;
