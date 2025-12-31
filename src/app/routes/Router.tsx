import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '@src/pages/home/Home';
import { AuthLayout } from '../layouts/AuthLayout';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    element: <AuthLayout />,
    children: [],
  },
]);
