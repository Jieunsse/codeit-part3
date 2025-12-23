import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { CardMonthly } from '@src/components/card/CardMonthly';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <CardMonthly
          size="large"
          rating={4.8}
          text="Ciel du Cheval Vineyard Collaboration Series II 2012"
        />
        <CardMonthly size="small" rating={4.5} text="Sentinel Carbernet Sauvignon 2016" />
      </main>
    </>
  );
}
