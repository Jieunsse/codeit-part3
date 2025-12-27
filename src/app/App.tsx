import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { CardMonthly } from '@src/components/card/CardMonthly';
import { CardMylist } from '@src/components/card/CardMylist';
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
        <CardMylist
          size="large"
          rating={4.8}
          text="Ciel du Cheval Vineyard Collaboration Series II 2012"
          price={30000}
        />
        <CardMylist
          size="small"
          rating={4.5}
          text="Sentinel Carbernet Sauvignon 2016"
          price={20000}
        />
        <CardMylist
          size="medium"
          rating={4.8}
          text="Napa Valley Cabernet Sauvignon 2017"
          price={40000}
        />
      </main>
    </>
  );
}
