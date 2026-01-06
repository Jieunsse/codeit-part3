import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Wines } from '@src/pages/wines/Wines';
import { WineDetailPage } from '@src/pages/wineDetailPage/WineDetailPage';
import LandingPage from '@src/pages/LandingPage/LandingPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/wines', element: <Wines /> },
      { path: '/wines/:wineId', element: <WineDetailPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [],
  },
]);
