import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Home } from '@src/pages/home/Home';
import { AuthLayout } from '../layouts/AuthLayout';
import { Wines } from '@src/pages/wines/Wines';
import { WineDetailPage } from '@src/pages/wineDetailPage/WineDetailPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/wines', element: <Wines /> },
      { path: '/wines/:wineId', element: <WineDetailPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [],
  },
]);
