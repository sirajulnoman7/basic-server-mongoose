import { Router } from 'express';
import userRoute from '../modules/users/userRoute';
import studentRouter from '../modules/students/StudentRouter';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
