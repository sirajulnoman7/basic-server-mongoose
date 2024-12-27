/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRole } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeTime?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserStaticsModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistFindByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof userRole;
