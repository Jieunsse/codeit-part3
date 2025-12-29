import { Outlet } from 'react-router-dom';
import { Header } from '@src/components/header/Header';
import { AuthInitializer } from './AuthInitializer';
import { RecommandedContainer } from '@src/domain/list/containers/RecommandedContainer';

export default function App() {
  return (
    <>
      <AuthInitializer />
      <Header />
      <main>
        <Outlet />
        <RecommandedContainer />
      </main>
    </>
  );
}
