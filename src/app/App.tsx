import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from './AuthInitializer';

export default function App() {
  return (
    <>
      <AuthInitializer />
      <span className="mt-[24px] flex justify-center">
        <Header />
      </span>
      <main>
        <Outlet />
      </main>
    </>
  );
}
