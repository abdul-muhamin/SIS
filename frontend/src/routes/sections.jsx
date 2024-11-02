import { lazy, Suspense   } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import { useState , useEffect } from 'react';
import DashboardLayout from 'src/layouts/dashboard'; 

export const IndexPage = lazy(() => import('src/pages/app'));
export const Teacher = lazy(() => import('src/pages/teacher'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/student'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const GradePage = lazy(() => import('src/pages/gradePage'));
// export const StudentPage = lazy(() => import('src/pages/add-student'));
export const AdminPanel = lazy(() => import('src/pages/admin-panel'));
export const AddAssignment = lazy(() => import('src/pages/add-assignment'));
export const AddAssignmentUserPage = lazy(() => import('src/pages/assignment-user'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const StudentAttendence = lazy(()=> import ('src/pages/student-attendance'))
export const StaffAttendence = lazy(()=> import ('src/pages/staff-attendance'))
export const SignUp = lazy(()=>import ('src/pages/signup'))
export const Schedule = lazy(()=>import ('src/pages/schedule'))
export const AppointmentChatbot = lazy(()=>import ('src/pages/appointmentChatBot'))
export const AdminStudentAttendance = lazy(()=>import ('src/pages/admin-student-attendence'))
export const AdminStafftAttendance = lazy(()=>import ('src/pages/admin-staff-attendence'))
export const SuperAdminDashboard = lazy(()=>import ('src/pages/super-admin-dashboard'))

// ----------------------------------------------------------------------

export default function Router() {
  
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard',element: <IndexPage/> },
        { path: 'student', element: <UserPage /> },
        { path: 'staff', element: <Teacher /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        // { path: 'student', element: <StudentPage /> },
        // { path: 'update-student', element: <UpdateStudentPage /> },
        { path: 'add-assignment', element: <AddAssignment /> },
        { path: 'admin-panel', element: <AdminPanel /> },
        { path: 'assignment', element: <AddAssignmentUserPage /> },
        { path: 'grade', element: <GradePage /> },
        { path: 'student-attendance', element: <StudentAttendence /> },
        { path: 'staff-attendance', element: <StaffAttendence /> },
        { path: 'schedule', element: <Schedule /> },
        { path: 'appointment-chatbot', element: <AppointmentChatbot /> }, 
        { path: 'admin-student-attendance', element: <AdminStudentAttendance /> }, 
        { path: 'admin-staff-attendance', element: <AdminStafftAttendance /> }, 
        { path: 'super-admin-dashboard', element: <SuperAdminDashboard /> }, 
        // { path: 'sign-up', element: <SignUp /> },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
