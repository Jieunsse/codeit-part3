import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes/Router';
import '@shared/styles/global.css';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
