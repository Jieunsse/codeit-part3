import { createBrowserRouter } from 'react-router-dom';
import App from '@app/App';
import { Home } from '@pages/home/Home';
import { InputTest } from '@src/pages/test/InputTest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/inputTest',
    element: <InputTest />,
  },
]);
