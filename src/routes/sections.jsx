import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const StudentPage = lazy(() => import('src/pages/add-student'));
export const UpdateStudentPage = lazy(() => import('src/pages/update-student'));
export const AdminPanel = lazy(() => import('src/pages/admin-panel'));
export const AddAssignment = lazy(() => import('src/pages/add-assignment'));
export const AssignmentUser = lazy(() => import('src/pages/assignment-user'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

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
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'student', element: <StudentPage /> },
        { path: 'update-student', element: <UpdateStudentPage /> },
        { path: 'add-assignment', element: <AddAssignment /> },
        { path: 'admin-panel', element: <AdminPanel /> },
        { path: 'Assignment-user', element: <AssignmentUser /> },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
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
