import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { AuthLayout } from '../layouts/AuthLayout';

import ProtectedRoute from '@src/app/routes/ProtectedRoute';

import { Wines } from '@src/pages/wines/Wines';
import { WineDetailPage } from '@src/pages/wineDetailPage/WineDetailPage';
import LandingPage from '@src/pages/LandingPage/LandingPage';
import { Login } from '@src/pages/login/Login';
import { SignUp } from '@src/pages/SignUp/SignUp';
import MyProfile from '@src/pages/profile/Profile';
import OAuthGoogleCallback from '@src/pages/login/AuthGoogleCallback';
import OAuthKakaoCallback from '@src/pages/login/AuthGoogleCallback';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/wines', element: <Wines /> },
      { path: '/wines/:wineId', element: <WineDetailPage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: '/myprofile', element: <MyProfile /> }],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },

      { path: '/oauth/google', element: <OAuthGoogleCallback /> },
      { path: '/oauth/kakao', element: <OAuthKakaoCallback /> },
    ],
  },
]);
