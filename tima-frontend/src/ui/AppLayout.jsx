import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <>
      <Header />
      <main className="bg-secondary-200">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
