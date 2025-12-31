import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from '@app/AuthInitializer';

export function DefaultLayout() {
  return (
    <>
      <AuthInitializer />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
