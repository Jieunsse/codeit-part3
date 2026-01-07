import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from '@app/AuthInitializer';
import clsx from 'clsx';

export function DefaultLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div
      className={clsx(
        'min-h-screen pt-[16px] md:pt-[24px]',
        isLanding ? 'bg-gray-100' : 'bg-white',
      )}
    >
      <AuthInitializer />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
