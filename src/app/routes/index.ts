import { Router } from 'express';
import userRoute from '../modules/users/userRoute';
import studentRouter from '../modules/students/StudentRouter';
import academicSemesterRoute from '../modules/academicSemester/academicSemesterRoute';
import academicFacultiesRoute from '../modules/acdemicFaculty/academicFacultyRoutes';
import academicDepartmentRoute from '../modules/academicDepartment/academicDepartmentRoutes';
import FacultyRoutes from '../modules/faculty/facultyRoute';
import courseRoute from '../modules/courses/courseRoutes';

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
  {
    path: '/academic-faculty',
    route: academicFacultiesRoute,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoute,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
