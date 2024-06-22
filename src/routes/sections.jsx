import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';

import { useRouter } from 'src/routes/hooks';

import { getLocalStorage } from 'src/utils/sessionStorage';

import CategoryPage from 'src/pages/category';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const router = useRouter();
  const location = useLocation();
  useEffect(() => {
    const token = getLocalStorage('capstone_admin_1');
    if (!token || token === '') {
      router.push('/login');
    }
    if (token && token !== '' && location.pathname.startsWith('/login')) {
      router.push('/');
    }
  }, [location.pathname, router]);
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
        { element: <CategoryPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
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
