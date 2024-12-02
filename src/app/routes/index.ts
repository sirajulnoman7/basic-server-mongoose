import { Router } from 'express';
import userRoute from '../modules/users/userRoute';
import studentRouter from '../modules/students/StudentRouter';
import academicSemesterRoute from '../modules/academicSemester/academicSemesterRoute';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
