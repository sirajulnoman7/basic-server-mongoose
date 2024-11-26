import express from 'express';
import { userController } from './userController';

const userRoute = express.Router();

userRoute.post('/create-student', userController.createStudent);

export default userRoute;
