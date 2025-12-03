import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { Footer } from '@src/components/footer/Footer';
import { Sidebar } from '@src/components/sidebar/Sidebar';

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
