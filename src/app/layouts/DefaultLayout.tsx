import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from '@app/AuthInitializer';

export function DefaultLayout() {
  return (
    <>
      <AuthInitializer />

      <div className="mt-[16px] flex justify-center md:mt-[24px]">
        <Header />
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
