import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { CardMonthly } from '@src/components/card/CardMonthly';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <CardMonthly />
      </main>
    </>
  );
}
