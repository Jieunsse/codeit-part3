import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
