import { Outlet } from 'react-router-dom';
import { AuthInitializer } from '@src/app/AuthInitializer';

export function AuthLayout() {
  return (
    <>
      <AuthInitializer />
      <main>
        <Outlet />
      </main>
    </>
  );
}
