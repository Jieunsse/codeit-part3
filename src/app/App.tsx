import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from './AuthInitializer';

export default function App() {
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
