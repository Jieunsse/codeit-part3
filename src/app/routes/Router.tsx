import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '@src/pages/home/Home';
import { AuthLayout } from '../layouts/AuthLayout';
import { TestTwo } from '@src/shared/test/TestTwo';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    element: <AuthLayout />,
    children: [{ path: '/test2', element: <TestTwo /> }],
  },
]);
